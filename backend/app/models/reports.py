from pydantic import BaseModel
from datetime import datetime

class Report(BaseModel):
    id: int
    patient_id: int
    generated_at: datetime
    content: str
