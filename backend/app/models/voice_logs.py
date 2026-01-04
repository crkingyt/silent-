from pydantic import BaseModel
from datetime import datetime

class VoiceLog(BaseModel):
    id: int
    patient_id: int
    timestamp: datetime
    audio_url: str
    transcript: str
