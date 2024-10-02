FROM node:20.14.0
WORKDIR /app
COPY . .
EXPOSE 3000
RUN apt-get update -y && npm install && apt upgrade -y python3 && apt install -y python3-pip && apt-get install -y python3-venv
RUN python3 -m venv venv
RUN venv/bin/pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
RUN venv/bin/pip install google-api-python-client google-auth-httplib2 google-auth-oauthlib psycopg2 ultralytics opencv-python
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
CMD ["node", "dist/main"]