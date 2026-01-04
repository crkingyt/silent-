from fastapi import APIRouter
from app.api.endpoints import (
    doctors, 
    onboarding, 
    profile, 
    daily_log, 
    risk_engine,
    auth,
    health_data,
    voice_nlp,
    recommendations,
    alerts,
    reports
)

api_router = APIRouter()
api_router.include_router(doctors.router, prefix="/doctors", tags=["doctors"])
api_router.include_router(onboarding.router, prefix="/onboarding", tags=["onboarding"])
api_router.include_router(profile.router, prefix="/profile", tags=["profile"])
api_router.include_router(daily_log.router, prefix="/daily-log", tags=["daily-log"])
api_router.include_router(risk_engine.router, prefix="/risk", tags=["risk"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(health_data.router, prefix="/health-data", tags=["health-data"])
api_router.include_router(voice_nlp.router, prefix="/voice-nlp", tags=["voice-nlp"])
api_router.include_router(recommendations.router, prefix="/recommendations", tags=["recommendations"])
api_router.include_router(alerts.router, prefix="/alerts", tags=["alerts"])
api_router.include_router(reports.router, prefix="/reports", tags=["reports"])
