from pydantic import BaseModel
from datetime import datetime

class RiskScore(BaseModel):
    id: int
    patient_id: int
    date: datetime
    diabetes_risk: float
    hypertension_risk: float
    cardiac_risk: float
