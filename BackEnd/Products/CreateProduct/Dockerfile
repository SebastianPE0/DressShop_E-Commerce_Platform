# Imagen base
FROM golang:1.20

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copiar el código fuente
COPY . .

# Compilar el servicio
RUN go build -o create-product-service main.go

# Exponer el puerto del servicio
EXPOSE 8082

# Comando para ejecutar el servicio
CMD ["./create-product-service"]
