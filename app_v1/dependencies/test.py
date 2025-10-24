# /app_v1/dependencies/test.py

import smtplib
from email.message import EmailMessage

# Предполагаем, что ваши settings и схемы импортируются так:
from app_v1.config import settings
from app_v1.schemas import EmailRequest
from .text_for_email import text

def send_email(email_request: EmailRequest):

    if not settings.smtp_email or not settings.smtp_password:
        raise ValueError("SMTP_USERNAME или SMTP_PASSWORD не настроены в переменных окружения.")

    target_email = email_request.email

    msg = EmailMessage()
    msg['Subject'] = '💌 Твое официальное приглашение на наше свидание!'
    msg['From'] = settings.smtp_email
    msg['To'] = target_email
    msg.set_content(text, charset='utf-8')

    try:
        with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port) as server:
            server.login(settings.smtp_email, settings.smtp_password)
            server.sendmail(settings.smtp_email, target_email, msg.as_bytes())
            print(f"Письмо успешно отправлено на {target_email}")

    except Exception as e:
        print(f"Ошибка при отправке письма: {e}")
        raise RuntimeError(f"Ошибка SMTP: {e}")