from pydantic import BaseModel
from typing import Dict

class RiskPrediction(BaseModel):
    condition: str
    probability: float
    risk_level: str # Low, Medium, High

class RiskAnalysisResponse(BaseModel):
    patient_id: int
    timestamp: str
    risks: Dict[str, RiskPrediction]
    overall_risk_score: float
