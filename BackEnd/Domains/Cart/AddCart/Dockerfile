# Usa Python 3.9 como base
FROM python:3.9

# Define un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo archivos esenciales primero (para aprovechar caché de Docker)
COPY requirements.txt .

# Actualizar pip y luego instalar dependencias
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copiar el código después de instalar dependencias
COPY . .

# Exponer el puerto en el que corre FastAPI
EXPOSE 8001

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
