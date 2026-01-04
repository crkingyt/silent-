class DoctorSummaryService:
    def generate_summary_for_doctor(self, patient_id):
        return {
            "patient_id": patient_id,
            "summary": "Patient is stable. Slight increase in BP.",
            "alerts": ["BP High"]
        }
