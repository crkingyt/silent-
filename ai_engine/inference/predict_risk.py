import random
import joblib
import os
import pandas as pd
import numpy as np

class RiskPredictionEngine:
    def __init__(self):
        self.model = None
        try:
            model_path = os.path.join(os.path.dirname(__file__), "../models/risk_model.pkl")
            if os.path.exists(model_path):
                self.model = joblib.load(model_path)
                print("Loaded trained ML model from risk_model.pkl")
            else:
                print("No model found. Using heuristic fallback.")
        except Exception as e:
            print(f"Failed to load model: {e}. Using heuristic fallback.")

    def predict_all(self, input_data):
        """
        Main entry point. Tries ML model first, falls back to heuristics.
        """
        if self.model:
            try:
                # Prepare input vector matching training data
                # ['age', 'bmi', 'smoking_habit', 'alcohol_habit', 'stress_level', 'systolic_bp', 'diastolic_bp', 'glucose']
                features = [
                    input_data.get('age', 35),
                    input_data.get('bmi', 25.0),
                    1 if input_data.get('smoking_habit') == 'Yes' else 0,
                    1 if input_data.get('alcohol_habit') == 'Yes' else 0,
                    input_data.get('stress_level', 1),
                    input_data.get('systolic_bp', 120),
                    input_data.get('diastolic_bp', 80),
                    input_data.get('glucose', 95)
                ]
                
                # Predict
                # Reshape for single sample
                prediction = self.model.predict([features])[0]
                
                return {
                    "diabetes": round(prediction[0], 1),
                    "hypertension": round(prediction[1], 1),
                    "liver": round(prediction[2], 1),
                    "cardiac": round(prediction[3], 1)
                }
            except Exception as e:
                print(f"Model prediction failed: {e}. Falling back to rules.")
        
        # Fallback to Heuristics
        return {
            "diabetes": self.predict_diabetes_risk(
                input_data.get('age', 35), 
                input_data.get('bmi', 25.0), 
                input_data.get('glucose', 95), 
                False
            ),
            "hypertension": self.predict_hypertension_risk(
                input_data.get('age', 35), 
                input_data.get('systolic_bp', 120), 
                input_data.get('diastolic_bp', 80), 
                input_data.get('smoking_habit') == 'Yes', 
                input_data.get('stress_level', 1)
            ),
            "liver": self.predict_liver_risk(
                input_data.get('alcohol_habit') == 'Yes', 
                input_data.get('bmi', 25.0)
            ),
            "cardiac": self.predict_cardiac_risk(
                input_data.get('age', 35), 
                input_data.get('smoking_habit') == 'Yes', 
                input_data.get('systolic_bp', 120), 
                input_data.get('bmi', 25.0)
            )
        }

    def predict_all_legacy(self, input_data):
        # Kept for reference, but predict_all now handles the logic
        pass

    def predict_diabetes_risk(self, age, bmi, glucose, family_history):
        """
        Returns a probability (0-100) for Type 2 Diabetes risk.
        Based on ADA Risk Test heuristics.
        """
        base_risk = 0.0
        
        # Age factor
        if age >= 60: base_risk += 30
        elif age >= 50: base_risk += 20
        elif age >= 40: base_risk += 10
        
        # BMI factor
        if bmi >= 40: base_risk += 40
        elif bmi >= 30: base_risk += 20
        elif bmi >= 25: base_risk += 10
        
        # Glucose factor (if available)
        if glucose and glucose > 125: base_risk += 50 # Diabetic range
        elif glucose and glucose > 100: base_risk += 30 # Prediabetic
        
        # Family history
        if family_history: base_risk += 15
        
        # Cap at 99
        return min(99.0, base_risk)

    def predict_hypertension_risk(self, age, sbp, dbp, smoking, stress_level):
        """
        Returns a probability (0-100) for Hypertension risk.
        Based on JNC 8 guidelines heuristics.
        """
        base_risk = 5.0
        
        if age > 60: base_risk += 20
        
        # BP Levels
        if sbp and sbp >= 140: base_risk += 50
        elif sbp and sbp >= 130: base_risk += 30
        
        if dbp and dbp >= 90: base_risk += 50
        elif dbp and dbp >= 80: base_risk += 30
        
        # Lifestyle
        if smoking == "Regular": base_risk += 20
        elif smoking == "Occasional": base_risk += 10
        
        if stress_level >= 8: base_risk += 15
        elif stress_level >= 5: base_risk += 5
        
        return min(99.0, base_risk)

    def predict_liver_risk(self, alcohol_habit, bmi):
        base_risk = 2.0
        
        if alcohol_habit == "Regular": base_risk += 45
        elif alcohol_habit == "Social": base_risk += 10
        
        if bmi > 35: base_risk += 25
        elif bmi > 30: base_risk += 15
        
        return min(99.0, base_risk)

    def predict_cardiac_risk(self, age, bmi, smoking, sbp, stress):
        """
        Framingham-like simple heuristic.
        """
        risk = 2.0
        if age > 50: risk += 15
        if bmi > 30: risk += 10
        if smoking == "Regular": risk += 30
        if sbp > 140: risk += 20
        if stress > 7: risk += 10
        return min(99.0, risk)

    def predict_liver_risk(self, alcohol_habit, bmi):
        risk = 5.0
        if alcohol_habit: risk += 50
        if bmi > 35: risk += 20
        return min(99.0, risk)

    def predict_cardiac_risk(self, age, smoking_habit, sbp, bmi):
        risk = 5.0
        if age > 50: risk += 20
        if smoking_habit: risk += 30
        if sbp > 140: risk += 20
        if bmi > 30: risk += 10
        return min(99.0, risk)

risk_engine = RiskPredictionEngine()
