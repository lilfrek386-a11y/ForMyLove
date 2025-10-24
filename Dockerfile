# /FORMYLOVE/Dockerfile

# Используем стандартный образ Python
FROM python:3.10-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# 1. Копируем и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 2. Копируем все файлы проекта (включая main.py и папку front)
# Здесь мы предполагаем, что main.py находится в корневой папке FORMYLOVE.
COPY . .

# Открываем порт
EXPOSE 8000

# Команда запуска Uvicorn
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--app-dir", "."]