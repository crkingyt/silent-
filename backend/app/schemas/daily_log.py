from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class DailyLogBase(BaseModel):
    log_date: datetime
    mood: str
    stress_level: int  # 1-10
    sleep_quality: int # 1-10
    symptoms: Optional[str] = None
    notes: Optional[str] = None
    voice_transcript: Optional[str] = None # If voice was used

class DailyLogCreate(DailyLogBase):
    pass

class DailyLogResponse(DailyLogBase):
    id: int
    user_id: int
    analysis_summary: Optional[str] = None
