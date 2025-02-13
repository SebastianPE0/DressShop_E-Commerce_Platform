# Usa una imagen base de Python
FROM python:3.10-slim

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del microservicio al contenedor
COPY . /app

# Instala las dependencias
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt && \
    pip install uvicorn fastapi

# Expone el puerto 
EXPOSE 80

# Comando de arranque
CMD ["uvicorn", "main:app", "--port", "80"]