# Imagen base
FROM golang:1.21.0

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY go.mod go.sum ./
RUN go mod download
COPY . .
EXPOSE 4000
# Compilar el código
RUN go build -o main .

# Comando de inicio
CMD ["./main"]
