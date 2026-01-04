from pydantic import BaseModel

class Habits(BaseModel):
    id: int
    patient_id: int
    smoking_status: str
    alcohol_consumption: str
