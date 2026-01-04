from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import sys
import os
from app.core.memory_store import store
from deep_translator import GoogleTranslator

# Ensure we can import from ai_engine
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../")))

try:
    from ai_engine.nlp.habit_extractor import habit_extractor
    from ai_engine.inference.predict_risk import risk_engine
except ImportError:
    # Fallback if import fails
    class MockExtractor:
        def analyze_text(self, text):
            return {
                "detected_habits": [],
                "stress_indicators": 0,
                "sleep_issues_detected": False,
                "sentiment_score": "Neutral"
            }
    habit_extractor = MockExtractor()
    # Mock risk engine if import fails
    class MockRiskEngine:
        def predict_all(self, data):
            return {"diabetes": 10.0, "hypertension": 10.0, "liver": 5.0, "cardiac": 5.0}
    risk_engine = MockRiskEngine()

router = APIRouter()

class VoiceAnalysisRequest(BaseModel):
    text: str
    language: Optional[str] = "en-US"

@router.post("/analyze-text")
async def analyze_text(request: VoiceAnalysisRequest):
    text = request.text
    original_text = text
    
    # Translate if not English
    if request.language and not request.language.startswith("en"):
        try:
            # Extract language code (e.g., "hi-IN" -> "hi")
            source_lang = request.language.split("-")[0]
            translator = GoogleTranslator(source=source_lang, target='en')
            text = translator.translate(text)
            print(f"Translated from {request.language}: {original_text} -> {text}")
        except Exception as e:
            print(f"Translation failed: {e}")
            # Fallback to original text if translation fails
            pass

    analysis = habit_extractor.analyze_text(text)
    
    # Map the simple analysis to the frontend's expected format
    symptoms = []
    if analysis["sleep_issues_detected"]:
        symptoms.append("Sleep Issues")
    if "Smoking" in analysis["detected_habits"]:
        symptoms.append("Smoking Risk")
    
    stress_level = "Low"
    if analysis["stress_indicators"] > 0:
        stress_level = "Medium"
    if analysis["stress_indicators"] > 2:
        stress_level = "High"

    # Calculate Risks using the AI Engine
    # We map the NLP findings to the Risk Engine inputs
    # Using defaults for metrics not extractable from voice yet (Age, BMI, BP)
    risk_input = {
        "age": 35, # Default
        "bmi": 26.5, # Default
        "smoking_habit": "Yes" if "Smoking" in analysis["detected_habits"] else "No",
        "alcohol_habit": "Yes" if "Alcohol" in analysis["detected_habits"] else "No",
        "stress_level": 3 if stress_level == "High" else (2 if stress_level == "Medium" else 1),
        "systolic_bp": 120,
        "diastolic_bp": 80,
        "glucose": 95
    }
    
    calculated_risks = risk_engine.predict_all(risk_input)

    # Update global store
    store.update({
        "detected_habits": analysis["detected_habits"],
        "symptoms": symptoms,
        "stress_level": stress_level,
        "sleep_issues": analysis["sleep_issues_detected"],
        "risks": calculated_risks
    })

    return {
        "transcript": text,
        "sentiment": analysis["sentiment_score"],
        "detected_symptoms": symptoms + analysis["detected_habits"],
        "health_metrics": {
            "stress": stress_level,
            "sleep": "Issues Detected" if analysis["sleep_issues_detected"] else "Normal",
            "habits": analysis["detected_habits"]
        },
        "prediction": {
            "risk": "Risk Analysis Complete",
            "level": stress_level,
            "details": calculated_risks
        },
        "recommendation": "Based on your log, consider tracking these symptoms closely."
    }

@router.post("/process-audio")
async def process_audio(file: UploadFile = File(...)):
    # Legacy/Mock endpoint for file upload if needed
    return {
        "transcript": "Audio processing not fully implemented. Please use text mode.",
        "sentiment": "Neutral",
        "detected_symptoms": [],
        "health_metrics": {"stress": "Unknown"}
    }
