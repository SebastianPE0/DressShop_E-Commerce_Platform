FROM golang:1.20

WORKDIR /app

# Copiar dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copiar el código fuente
COPY . .

# Compilar el servicio
RUN go build -o update-product-service main.go

# Exponer el puerto
EXPOSE 80

# Ejecutar el servicio
CMD ["./update-product-service"]
