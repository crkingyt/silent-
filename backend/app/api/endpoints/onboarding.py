from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.onboarding import OnboardingCreate, OnboardingResponse

router = APIRouter()

# Mock Database
onboarding_db = []

@router.post("/", response_model=OnboardingResponse)
def create_onboarding_report(report: OnboardingCreate):
    # Calculate BMI
    bmi = 0
    if report.height > 0:
        bmi = report.weight / ((report.height / 100) ** 2)
    
    # Simple mock risk calculation
    risk_score = 10.0
    if report.smoking_habit != "None":
        risk_score += 20
    if bmi > 25:
        risk_score += 15
        
    new_report = OnboardingResponse(
        id=len(onboarding_db) + 1,
        user_id=1, # Mock user ID
        bmi=round(bmi, 2),
        risk_score_baseline=risk_score,
        **report.model_dump()
    )
    onboarding_db.append(new_report)
    return new_report

@router.get("/{user_id}", response_model=OnboardingResponse)
def get_onboarding_report(user_id: int):
    for report in onboarding_db:
        if report.user_id == user_id:
            return report
    raise HTTPException(status_code=404, detail="Onboarding report not found")
