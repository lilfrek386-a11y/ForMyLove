# # /app_v1/dependencies/test.py
#
# import smtplib
# from email.message import EmailMessage
#
# # Предполагаем, что ваши settings и схемы импортируются так:
# from app_v1.config import settings
# from app_v1.schemas import EmailRequest
# from .text_for_email import text
#
# def send_email(email_request: EmailRequest):
#
#     if not settings.smtp_email or not settings.smtp_password:
#         raise ValueError("SMTP_USERNAME или SMTP_PASSWORD не настроены в переменных окружения.")
#
#     target_email = email_request.email
#
#     msg = EmailMessage()
#     msg['Subject'] = '💌 Твое официальное приглашение на наше свидание!'
#     msg['From'] = settings.smtp_email
#     msg['To'] = target_email
#     msg.set_content(text, charset='utf-8')
#
#     try:
#         with smtplib.SMTP_SSL(settings.smtp_host, settings.smtp_port) as server:
#             server.login(settings.smtp_email, settings.smtp_password)
#             server.sendmail(settings.smtp_email, target_email, msg.as_bytes())
#             print(f"Письмо успешно отправлено на {target_email}")
#
#     except Exception as e:
#         print(f"Ошибка при отправке письма: {e}")
#         raise RuntimeError(f"Ошибка SMTP: {e}")
# /app_v1/dependencies/test.py

import smtplib
from email.message import EmailMessage
from app_v1.config import settings
from app_v1.schemas import EmailRequest
from app_v1.dependencies.text_for_email import text


def send_email(email_request: EmailRequest):
    """
    Отправляет приглашение через Gmail SMTP с использованием TLS (порт 587).
    """

    if not settings.email_user or not settings.email_pass:
        raise ValueError("SMTP_LOGIN или SMTP_PASSWORD не настроены в переменных окружения.")

    target_email = email_request.email

    msg = EmailMessage()
    msg['Subject'] = '💌 Твое официальное приглашение!'
    msg['From'] = settings.email_user
    msg['To'] = target_email
    msg.set_content(text, charset='utf-8')

    try:
        # 1. Установка соединения через TLS (порт 587)
        with smtplib.SMTP(settings.email_host, settings.email_port) as server:
            server.starttls()  # Инициализация TLS-шифрования
            server.login(settings.email_user, settings.email_pass)
            server.sendmail(settings.email_user, target_email, msg.as_bytes())
            print(f"Письмо успешно отправлено через SMTP на {target_email}")

    except smtplib.SMTPAuthenticationError:
        raise RuntimeError("Ошибка SMTP: Проверьте Пароль Приложения Gmail.")
    except Exception as e:
        # Ошибка Network unreachable или другая сетевая ошибка
        raise RuntimeError(f"Сетевая ошибка при отправке SMTP: {e}")
