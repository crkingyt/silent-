from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import sys
import os

# Add the project root to sys.path to import ai_engine
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../")))

from ai_engine.inference.predict_risk import risk_engine

router = APIRouter()

class RiskInput(BaseModel):
    age: int
    bmi: float
    smoking_habit: str
    alcohol_habit: str
    stress_level: int
    systolic_bp: Optional[int] = 120
    diastolic_bp: Optional[int] = 80
    glucose: Optional[int] = 90

class RiskOutput(BaseModel):
    diabetes: float
    hypertension: float
    liver: float
    cardiac: float

@router.post("/predict", response_model=RiskOutput)
def predict_health_risks(data: RiskInput):
    try:
        risks = risk_engine.predict_all(data.model_dump())
        return risks
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk prediction failed: {str(e)}")
