from fastapi import APIRouter, HTTPException
from app.schemas.profile import ProfileUpdate, ProfileResponse

router = APIRouter()

# Mock Database
profiles_db = [
    ProfileResponse(
        id=1,
        user_id=1,
        email="patient@example.com",
        full_name="John Doe",
        height=175,
        weight=70,
        smoking_habit="None",
        alcohol_habit="Social"
    )
]

@router.get("/{user_id}", response_model=ProfileResponse)
def get_profile(user_id: int):
    for profile in profiles_db:
        if profile.user_id == user_id:
            return profile
    raise HTTPException(status_code=404, detail="Profile not found")

@router.put("/{user_id}", response_model=ProfileResponse)
def update_profile(user_id: int, profile_update: ProfileUpdate):
    for i, profile in enumerate(profiles_db):
        if profile.user_id == user_id:
            updated_profile = profile.model_copy(update=profile_update.model_dump(exclude_unset=True))
            profiles_db[i] = updated_profile
            return updated_profile
    raise HTTPException(status_code=404, detail="Profile not found")
