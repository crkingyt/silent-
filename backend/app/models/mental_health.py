from pydantic import BaseModel

class MentalHealth(BaseModel):
    id: int
    patient_id: int
    stress_level: int
    mood: str
