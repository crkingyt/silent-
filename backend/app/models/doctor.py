from pydantic import BaseModel

class Doctor(BaseModel):
    id: int
    user_id: int
    specialization: str
    hospital: str
