from pydantic_settings import BaseSettings
from dotenv import load_dotenv
import os

# Load .env file
env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), ".env")
load_dotenv(env_path)

class Settings(BaseSettings):
    PROJECT_NAME: str = "Silent Disease Engine"
    API_V1_STR: str = "/api/v1"
    GOOGLE_API_KEY: str | None = None
    
    class Config:
        case_sensitive = True

settings = Settings()
