from datetime import datetime
from app.core.memory_store import store
from app.services.email_service import email_service

class ReportService:
    def generate_daily_summary(self):
        state = store.get()
        
        # Aggregate data
        habits = state.get("detected_habits", [])
        symptoms = state.get("symptoms", [])
        risks = state.get("risks", {})
        stress = state.get("stress_level", "Unknown")
        
        report = f"""
        DAILY HEALTH REPORT
        Date: {datetime.now().strftime('%Y-%m-%d')}
        ----------------------------------------
        Patient Status:
        - Stress Level: {stress}
        - Sleep Issues: {"Yes" if state.get("sleep_issues") else "No"}
        
        Detected Habits/Symptoms:
        {", ".join(habits + symptoms) if (habits or symptoms) else "None reported"}
        
        Risk Assessment:
        - Diabetes Risk: {risks.get('diabetes', 0)}%
        - Hypertension Risk: {risks.get('hypertension', 0)}%
        - Cardiac Risk: {risks.get('cardiac', 0)}%
        - Liver Risk: {risks.get('liver', 0)}%
        ----------------------------------------
        """
        return report

    def send_daily_report_to_doctor(self, doctor_email: str):
        report_content = self.generate_daily_summary()
        subject = f"Daily Patient Report - {datetime.now().strftime('%Y-%m-%d')}"
        
        email_service.send_email(doctor_email, subject, report_content)
        return {"status": "sent", "recipient": doctor_email}

report_service = ReportService()
