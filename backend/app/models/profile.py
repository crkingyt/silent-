from pydantic import BaseModel
from typing import Optional

class Profile(BaseModel):
    id: int
    user_id: int
    bio: Optional[str] = None
    avatar_url: Optional[str] = None
