import sys
import os
from dotenv import load_dotenv

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Load env vars
load_dotenv()

from app.services.recommendation_engine import RecommendationEngine

def test_engine():
    print("Initializing engine...")
    engine = RecommendationEngine()
    
    if not engine.model:
        print("Error: Model not initialized. Check GOOGLE_API_KEY.")
        return

    print("Generating recommendations...")
    risk_profile = {
        "detected_habits": ["Smoking", "Sedentary"],
        "symptoms": ["Cough"],
        "stress_level": "High",
        "sleep_issues": True,
        "risks": {"cardiac": 15.0}
    }
    
    try:
        result = engine.generate_recommendations(risk_profile)
        print("Result:", result)
    except Exception as e:
        print(f"Exception: {e}")

if __name__ == "__main__":
    test_engine()
