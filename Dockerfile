# Use a lightweight Python base image suitable for serving static files
FROM python:3.12-slim

# Set working directory inside the container
WORKDIR /app

# Copy project files into the container
COPY . .

# Expose the default Cloud Run port
ENV PORT=8080

# Cloud Run sends traffic on $PORT; use Python's HTTP server to serve static assets
CMD ["python", "-m", "http.server", "8080"]
