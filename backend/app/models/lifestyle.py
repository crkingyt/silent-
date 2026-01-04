from pydantic import BaseModel

class Lifestyle(BaseModel):
    id: int
    patient_id: int
    activity_level: str
    diet_type: str
