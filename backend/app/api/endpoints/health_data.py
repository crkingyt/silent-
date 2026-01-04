from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class LabDataInput(BaseModel):
    test_name: str
    value: float
    unit: str
    date: str

@router.post("/upload-lab")
def upload_lab_data(data: List[LabDataInput]):
    return {"message": "Lab data processed successfully", "count": len(data)}
