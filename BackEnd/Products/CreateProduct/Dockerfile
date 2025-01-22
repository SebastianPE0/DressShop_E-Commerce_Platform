# Usa la imagen oficial de Go
FROM golang:1.20

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY . .

# Descarga dependencias y compila
RUN go mod tidy
RUN go build -o create-service main.go

# Expone el puerto del servicio
EXPOSE 8081

# Ejecuta el servicio
CMD ["./create-service"]
