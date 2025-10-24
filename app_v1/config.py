# /app_v1/config.py
import os

class Settings():
    # Теперь читает из переменных окружения Render
    smtp_email: str = os.environ.get("SMTP_USERNAME")
    smtp_password: str = os.environ.get("SMTP_PASSWORD")
    smtp_host: str = os.environ.get("SMTP_HOST", "smtp.gmail.com") # Default for Gmail
    smtp_port: int = int(os.environ.get("SMTP_PORT", 465)) # Default for SSL/TLS

settings = Settings()