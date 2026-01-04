from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/{user_id}")
def get_alerts(user_id: int):
    return [
        {"severity": "High", "message": "Blood pressure trend is rising.", "date": "2026-01-04"}
    ]
