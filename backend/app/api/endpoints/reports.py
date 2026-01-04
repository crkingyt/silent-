from fastapi import APIRouter
from app.schemas.report import ReportRequest, ReportResponse
from datetime import datetime
from app.services.report_service import report_service

router = APIRouter()

@router.post("/send-daily-report")
def send_daily_report(doctor_email: str = "doctor@hospital.com"):
    """
    Manually triggers the daily report email to the specified doctor.
    Useful for testing the scheduler logic immediately.
    """
    result = report_service.send_daily_report_to_doctor(doctor_email)
    return result

@router.post("/generate", response_model=ReportResponse)
def generate_report(request: ReportRequest):
    return ReportResponse(
        id=123,
        generated_at=datetime.now(),
        content=f"Health summary for patient {request.patient_id}...",
        download_url="/downloads/report_123.pdf"
    )
