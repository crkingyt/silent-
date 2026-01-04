import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib
import os

# 1. Generate Synthetic Medical Data
# We simulate 1000 patient records based on medical guidelines
def generate_synthetic_data(n_samples=1000):
    np.random.seed(42)
    
    data = {
        'age': np.random.randint(20, 80, n_samples),
        'bmi': np.random.normal(25, 5, n_samples),
        'smoking_habit': np.random.choice([0, 1], n_samples, p=[0.7, 0.3]), # 0=No, 1=Yes
        'alcohol_habit': np.random.choice([0, 1], n_samples, p=[0.6, 0.4]),
        'stress_level': np.random.randint(1, 4, n_samples), # 1=Low, 2=Med, 3=High
        'systolic_bp': np.random.normal(120, 15, n_samples),
        'diastolic_bp': np.random.normal(80, 10, n_samples),
        'glucose': np.random.normal(95, 20, n_samples)
    }
    
    df = pd.DataFrame(data)
    
    # Calculate "Ground Truth" Risks (using the same heuristics we want the model to learn)
    # This simulates having a dataset labeled by doctors
    
    # Diabetes Risk Logic
    df['diabetes_risk'] = (
        (df['age'] > 45) * 20 + 
        (df['bmi'] > 30) * 30 + 
        (df['glucose'] > 100) * 40 +
        np.random.normal(0, 5, n_samples) # Add noise
    ).clip(0, 100)

    # Hypertension Risk Logic
    df['hypertension_risk'] = (
        (df['systolic_bp'] > 130) * 40 + 
        (df['smoking_habit'] == 1) * 20 + 
        (df['stress_level'] == 3) * 15 +
        np.random.normal(0, 5, n_samples)
    ).clip(0, 100)

    # Liver Risk Logic
    df['liver_risk'] = (
        (df['alcohol_habit'] == 1) * 50 + 
        (df['bmi'] > 35) * 20 +
        np.random.normal(0, 5, n_samples)
    ).clip(0, 100)

    # Cardiac Risk Logic
    df['cardiac_risk'] = (
        (df['age'] > 50) * 20 + 
        (df['smoking_habit'] == 1) * 30 + 
        (df['systolic_bp'] > 140) * 20 + 
        (df['bmi'] > 30) * 10 +
        np.random.normal(0, 5, n_samples)
    ).clip(0, 100)

    # Save synthetic data for inspection
    data_dir = os.path.join(os.path.dirname(__file__), "../data")
    os.makedirs(data_dir, exist_ok=True)
    csv_path = os.path.join(data_dir, "synthetic_patients.csv")
    df.to_csv(csv_path, index=False)
    print(f"Synthetic dataset saved to {csv_path}")

    return df

def train():
    print("Generating synthetic medical dataset...")
    df = generate_synthetic_data()
    
    X = df[['age', 'bmi', 'smoking_habit', 'alcohol_habit', 'stress_level', 'systolic_bp', 'diastolic_bp', 'glucose']]
    y = df[['diabetes_risk', 'hypertension_risk', 'liver_risk', 'cardiac_risk']]
    
    print("Training Random Forest Regressor...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X, y)
    
    # Save Model
    output_dir = os.path.join(os.path.dirname(__file__), "../models")
    os.makedirs(output_dir, exist_ok=True)
    model_path = os.path.join(output_dir, "risk_model.pkl")
    
    joblib.dump(model, model_path)
    print(f"Model saved to {model_path}")
    
    # Test prediction
    sample = [[35, 26.5, 1, 0, 3, 120, 80, 95]] # Smoker, High Stress
    prediction = model.predict(sample)
    print(f"Test Prediction for Smoker/HighStress: {prediction}")

if __name__ == "__main__":
    train()
