FROM golang:1.22

WORKDIR /app

# Copiar dependencias
COPY go.mod go.sum ./
RUN go mod download

# Copiar el código fuente
COPY . .

# Compilar el servicio
RUN go build -o get-products-service main.go

# Exponer el puerto
EXPOSE 6003

# Ejecutar el servicio
CMD ["./get-products-service"]
