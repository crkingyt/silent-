from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.api import api_router
from app.core.config import settings
from contextlib import asynccontextmanager
from apscheduler.schedulers.background import BackgroundScheduler
from app.services.report_service import report_service

# Scheduler Setup
scheduler = BackgroundScheduler()

def scheduled_daily_report():
    # Hardcoded doctor email for demo
    print("Executing scheduled daily report...")
    report_service.send_daily_report_to_doctor("doctor@hospital.com")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start Scheduler
    # Schedule to run every day at 23:59 (End of Day)
    # For demo purposes, we can also trigger it manually via endpoint
    scheduler.add_job(scheduled_daily_report, 'cron', hour=23, minute=59)
    scheduler.start()
    print("Scheduler started. Daily report set for 23:59.")
    yield
    # Shutdown Scheduler
    scheduler.shutdown()

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Backend API for Silent Disease Engine",
    version="0.1.0",
    lifespan=lifespan
)

# Set all CORS enabled origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    return {"message": "Welcome to Silent Disease Engine API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
