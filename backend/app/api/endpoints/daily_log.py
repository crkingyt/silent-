from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.daily_log import DailyLogCreate, DailyLogResponse
import sys
import os

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../../../")))
from ai_engine.nlp.habit_extractor import habit_extractor

router = APIRouter()

# Mock Database
daily_logs_db = []

@router.post("/", response_model=DailyLogResponse)
def create_daily_log(log: DailyLogCreate):
    # AI Analysis
    analysis_text = ""
    if log.notes:
        nlp_result = habit_extractor.analyze_text(log.notes)
        
        habits = ", ".join(nlp_result["detected_habits"])
        if habits:
            analysis_text += f"Detected habits: {habits}. "
            
        if nlp_result["stress_indicators"] > 0:
            analysis_text += "Signs of stress detected in text. "
            
        if nlp_result["sleep_issues_detected"]:
            analysis_text += "Sleep issues mentioned. "
    
    if not analysis_text:
        analysis_text = "Routine log recorded."

    if log.stress_level > 7:
        analysis_text += " High reported stress level."
        
    new_log = DailyLogResponse(
        id=len(daily_logs_db) + 1,
        user_id=1, # Mock user ID
        analysis_summary=analysis_text,
        **log.model_dump()
    )
    daily_logs_db.append(new_log)
    return new_log

@router.get("/{user_id}", response_model=List[DailyLogResponse])
def get_daily_logs(user_id: int):
    user_logs = [log for log in daily_logs_db if log.user_id == user_id]
    return user_logs
