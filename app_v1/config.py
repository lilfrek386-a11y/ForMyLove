# /app_v1/config.py
import os


class Settings:
    sendgrid_api_key: str = os.environ.get("SENDGRID_API_KEY")
    email_sender: str = "myrkry477@gmail.com"


settings = Settings()
