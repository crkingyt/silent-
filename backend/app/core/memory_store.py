# Simple in-memory store to simulate database for the session
class HealthStateStore:
    def __init__(self):
        self.latest_analysis = {
            "detected_habits": [],
            "symptoms": [],
            "stress_level": "Low",
            "sleep_issues": False,
            "risks": {
                "diabetes": 0.0,
                "hypertension": 0.0,
                "liver": 0.0,
                "cardiac": 0.0
            }
        }

    def update(self, analysis_data):
        self.latest_analysis.update(analysis_data)

    def get(self):
        return self.latest_analysis

# Global instance
store = HealthStateStore()
