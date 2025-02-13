# Imagen base
FROM golang:1.20

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Compilar el código
RUN go build -o main .

# Comando de inicio
CMD ["./main"]
