from pydantic import BaseModel
from typing import Optional

class Patient(BaseModel):
    id: int
    user_id: int
    full_name: str
    dob: Optional[str] = None
