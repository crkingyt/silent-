from pydantic import BaseModel
from datetime import datetime

class LabData(BaseModel):
    id: int
    patient_id: int
    test_date: datetime
    test_name: str
    result_value: float
    unit: str
