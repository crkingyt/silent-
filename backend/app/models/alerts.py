from pydantic import BaseModel
from datetime import datetime

class Alert(BaseModel):
    id: int
    patient_id: int
    timestamp: datetime
    message: str
    severity: str
