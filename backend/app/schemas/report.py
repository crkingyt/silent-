from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ReportRequest(BaseModel):
    patient_id: int
    report_type: str # "daily", "weekly", "monthly"

class ReportResponse(BaseModel):
    id: int
    generated_at: datetime
    content: str
    download_url: Optional[str] = None
