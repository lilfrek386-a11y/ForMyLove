import smtplib
from email.message import EmailMessage

from app_v1.config import settings
from app_v1.dependencies.text_for_email import text
from app_v1.schemas import EmailRequest


def send_email(email_to: EmailRequest, email_text: str = text , email_from: str = settings.smtp_email, password: str = settings.smtp_password,):
    msg = EmailMessage()
    msg['Subject'] = 'Приглашение'
    msg['From'] = "Сервис для влюбленных"
    msg['To'] = email_to
    msg.set_content(email_text, charset='utf-8')

    target_email = email_to.email
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(email_from, password)

        server.sendmail(email_from, target_email, msg.as_bytes())


