from pydantic import BaseModel
from typing import Optional, List

class OnboardingBase(BaseModel):
    age: int
    gender: str
    height: float
    weight: float
    activity_level: str
    smoking_habit: str  # e.g., "None", "Occasional", "Regular"
    alcohol_habit: str  # e.g., "None", "Social", "Regular"
    diet_type: str
    sleep_hours: float
    existing_conditions: List[str] = []
    family_history: List[str] = []

class OnboardingCreate(OnboardingBase):
    pass

class OnboardingUpdate(OnboardingBase):
    pass

class OnboardingResponse(OnboardingBase):
    id: int
    user_id: int
    bmi: float
    risk_score_baseline: float
