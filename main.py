from fastapi import FastAPI, HTTPException
from starlette.responses import HTMLResponse
from starlette.staticfiles import StaticFiles

from app_v1.dependencies.test import send_email
from app_v1.schemas import EmailRequest
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

app.mount("/static", StaticFiles(directory="front"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", response_class=HTMLResponse)
async def get_index():
    with open("front/index.html", "r", encoding="utf-8") as f:
        return f.read()


@app.post("/send-invitation")
def send_invitation(email: EmailRequest):
    try:
        send_email(email_to=email)
        return {"message": "Invitation sent successfully"}
    except Exception as e:
        print(f"Ошибка при отправке письма: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Не удалось отправить письмо. Проверь настройки SMTP или логику: {e}"
        )