# Backend Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend code
COPY backend/ .
# Copy AI engine code (needed for imports)
COPY ai_engine/ /ai_engine/

# Set python path to include ai_engine
ENV PYTHONPATH=/app:/

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
