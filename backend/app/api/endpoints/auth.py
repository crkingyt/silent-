from fastapi import APIRouter, HTTPException, Depends
from app.schemas.auth import UserCreate, UserLogin, Token
from app.core.security import create_access_token

router = APIRouter()

users_db = {} # Mock user storage

@router.post("/signup", response_model=Token)
def signup(user: UserCreate):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    users_db[user.email] = user
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/login", response_model=Token)
def login(user: UserLogin):
    # In real app, check password hash. For now, just check existence or allow all for demo
    # if user.email not in users_db: 
    #     raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
