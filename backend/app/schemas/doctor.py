from pydantic import BaseModel
from typing import Optional

class DoctorBase(BaseModel):
    name: str
    specialist: str
    experience: str
    hospital: str
    phone: Optional[str] = None

class DoctorCreate(DoctorBase):
    pass

class Doctor(DoctorBase):
    id: int

    class Config:
        from_attributes = True
