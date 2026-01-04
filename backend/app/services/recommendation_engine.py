import google.generativeai as genai
from app.core.config import settings
import json

class RecommendationEngine:
    def __init__(self):
        if settings.GOOGLE_API_KEY:
            genai.configure(api_key=settings.GOOGLE_API_KEY)
            self.model = genai.GenerativeModel('gemini-2.0-flash')
        else:
            self.model = None

    def generate_recommendations(self, risk_profile):
        if not self.model:
            return {
                "critical_actions": [],
                "daily_improvements": [
                    {
                        "id": 1,
                        "title": "API Key Missing",
                        "reason": "Please configure the Google API Key to get personalized recommendations.",
                        "actions": ["Add GOOGLE_API_KEY to .env file"],
                        "priority": "High",
                        "icon": "Activity"
                    }
                ]
            }
        
        prompt = f"""
        You are a health expert. Based on the following patient risk profile, provide personalized health recommendations.
        
        Risk Profile:
        {risk_profile}
        
        Output strictly valid JSON with the following structure:
        {{
            "critical_actions": [
                {{
                    "habit": "Name of the risk factor or habit (e.g., Smoking, High Stress)",
                    "riskIncrease": "Estimated risk increase (e.g., 45%)",
                    "remedySteps": ["Detailed step-by-step instruction on how to overcome this habit", "Step 2", "Step 3"],
                    "sideEffects": ["Potential side effect 1", "Potential side effect 2"]
                }}
            ],
            "daily_improvements": [
                {{
                    "title": "Short title of the improvement",
                    "reason": "Why this is recommended",
                    "actions": ["Actionable step 1", "Actionable step 2"],
                    "priority": "High, Medium, or Low",
                    "icon": "Choose one: Utensils (for food), Moon (for sleep), or Activity (for fitness)",
                    "calories_burned": "Estimated calories burned (e.g., '250 kcal') if it is a fitness activity, else null",
                    "dietary_suggestions": "Specific food items to eat or avoid if it is a dietary recommendation, else null"
                }}
            ]
        }}
        Do not include markdown formatting like ```json ... ```.
        """
        
        try:
            response = self.model.generate_content(prompt)
            text = response.text.strip()
            # Remove markdown code blocks if present
            if text.startswith("```json"):
                text = text[7:]
            if text.startswith("```"):
                text = text[3:]
            if text.endswith("```"):
                text = text[:-3]
                
            recommendations = json.loads(text)
            
            # Add IDs to daily_improvements as frontend might expect them
            for i, item in enumerate(recommendations.get("daily_improvements", [])):
                item["id"] = i + 1
                
            return recommendations
        except Exception as e:
            print(f"Error parsing recommendations: {e}")
            # Return a rich mock response for demonstration/fallback
            return {
                "critical_actions": [
                    {
                        "habit": "Sedentary Lifestyle",
                        "riskIncrease": "20%",
                        "remedySteps": [
                            "Start with 10-minute walks after meals.",
                            "Use a standing desk if possible.",
                            "Set hourly reminders to stretch."
                        ],
                        "sideEffects": [
                            "Muscle stiffness",
                            "Reduced metabolism",
                            "Poor circulation"
                        ]
                    }
                ],
                "daily_improvements": [
                    {
                        "id": 1,
                        "title": "Morning Walk",
                        "reason": "Improves cardiovascular health and boosts mood.",
                        "actions": ["Walk for 30 minutes at a moderate pace."],
                        "priority": "Medium",
                        "icon": "Activity",
                        "calories_burned": "150 kcal",
                        "dietary_suggestions": None
                    },
                    {
                        "id": 2,
                        "title": "Balanced Breakfast",
                        "reason": "Provides sustained energy throughout the day.",
                        "actions": ["Include protein and fiber in your morning meal."],
                        "priority": "High",
                        "icon": "Utensils",
                        "calories_burned": None,
                        "dietary_suggestions": "Oatmeal with berries and nuts, or scrambled eggs with spinach."
                    },
                    {
                        "id": 3,
                        "title": "Hydration",
                        "reason": "Essential for all bodily functions.",
                        "actions": ["Drink at least 8 glasses of water daily."],
                        "priority": "High",
                        "icon": "Utensils",
                        "calories_burned": None,
                        "dietary_suggestions": "Water, herbal tea, cucumber slices."
                    }
                ]
            }
