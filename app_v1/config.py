# /app_v1/config.py
import os  # Импортируем модуль os


# Теперь класс будет брать значения из переменных окружения Render
class Settings():
    # Если переменная окружения не найдена, используем None
    smtp_email: str = os.environ.get("SMTP_USERNAME")
    smtp_password: str = os.environ.get("SMTP_PASSWORD")

    # Это можно оставить, так как это не секрет
    test_email_to: str = "pashaistoshin90@gmail.com"


settings = Settings()