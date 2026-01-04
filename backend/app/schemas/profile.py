from pydantic import BaseModel
from typing import Optional, List

class ProfileBase(BaseModel):
    full_name: str
    phone_number: Optional[str] = None
    address: Optional[str] = None
    emergency_contact: Optional[str] = None
    height: Optional[float] = None
    weight: Optional[float] = None
    smoking_habit: Optional[str] = None
    alcohol_habit: Optional[str] = None

class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: int
    user_id: int
    email: str
