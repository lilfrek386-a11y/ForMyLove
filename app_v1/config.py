# /app_v1/config.py
import os


class Settings():
    # Используем новые названия переменных для чистоты
    email_user: str = os.environ.get("EMAIL_USER")
    email_pass: str = os.environ.get("EMAIL_PASS")
    email_host: str = os.environ.get("EMAIL_HOST", "smtp.gmail.com")
    email_port: int = int(os.environ.get("EMAIL_PORT", 587))  # Порт 587 для TLS


settings = Settings()