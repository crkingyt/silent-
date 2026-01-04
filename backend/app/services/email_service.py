import logging

logger = logging.getLogger(__name__)

class EmailService:
    def send_email(self, to_email: str, subject: str, body: str):
        """
        Simulates sending an email.
        In a real app, this would use SMTP or an API like SendGrid/AWS SES.
        """
        logger.info(f"--- EMAIL SIMULATION ---")
        logger.info(f"To: {to_email}")
        logger.info(f"Subject: {subject}")
        logger.info(f"Body: \n{body}")
        logger.info(f"------------------------")
        print(f"Email sent to {to_email} with subject: {subject}")
        return True

email_service = EmailService()
