# Imagen base
FROM golang:1.22

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos
COPY go.mod go.sum ./
RUN go mod download
COPY . .
EXPOSE 6001
# Compilar el código
RUN go build -o main .

# Comando de inicio
CMD ["./main"]
