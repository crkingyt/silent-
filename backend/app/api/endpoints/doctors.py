from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.doctor import Doctor, DoctorCreate

router = APIRouter()

# Mock database
doctors_db = []

@router.get("/dashboard-stats")
def get_dashboard_stats():
    return {
        "total_patients": 124,
        "high_risk_alerts": 12,
        "critical_trends": 5,
        "pending_reviews": 8,
        "patients": [
             { "id": 1, "name": "John Doe", "age": 45, "risk": "High", "condition": "Diabetes Type 2", "lastVisit": "2 days ago", "trend": "worsening" },
             { "id": 2, "name": "Sarah Smith", "age": 32, "risk": "Medium", "condition": "Hypertension", "lastVisit": "1 week ago", "trend": "stable" },
             { "id": 3, "name": "Michael Brown", "age": 58, "risk": "Low", "condition": "Routine Checkup", "lastVisit": "3 weeks ago", "trend": "improving" },
             { "id": 4, "name": "Emily Davis", "age": 29, "risk": "High", "condition": "Anxiety Disorder", "lastVisit": "Yesterday", "trend": "worsening" },
             { "id": 5, "name": "David Wilson", "age": 52, "risk": "Medium", "condition": "Liver Function", "lastVisit": "5 days ago", "trend": "stable" },
        ]
    }

@router.post("/", response_model=Doctor)
def create_doctor(doctor: DoctorCreate):
    new_doctor = Doctor(id=len(doctors_db) + 1, **doctor.model_dump())
    doctors_db.append(new_doctor)
    return new_doctor

@router.get("/", response_model=List[Doctor])
def read_doctors():
    return doctors_db

@router.get("/{doctor_id}", response_model=Doctor)
def read_doctor(doctor_id: int):
    for doctor in doctors_db:
        if doctor.id == doctor_id:
            return doctor
    raise HTTPException(status_code=404, detail="Doctor not found")

@router.put("/{doctor_id}", response_model=Doctor)
def update_doctor(doctor_id: int, doctor_update: DoctorCreate):
    for i, doctor in enumerate(doctors_db):
        if doctor.id == doctor_id:
            updated_doctor = Doctor(id=doctor_id, **doctor_update.model_dump())
            doctors_db[i] = updated_doctor
            return updated_doctor
    raise HTTPException(status_code=404, detail="Doctor not found")
