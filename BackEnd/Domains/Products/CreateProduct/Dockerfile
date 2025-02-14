# Usa la versión específica de Go 1.22
FROM golang:1.22 AS builder

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias y descargar módulos
COPY go.mod go.sum ./
RUN go mod tidy  # Limpia y organiza las dependencias
RUN go mod download

# Copiar el código fuente y compilar
COPY . .
RUN go build -o main .

# Segunda etapa: Imagen ligera sin dependencias innecesarias
FROM gcr.io/distroless/base-debian11
WORKDIR /root/

# Copiar binario desde la etapa anterior
COPY --from=builder /app/main .

# Exponer el puerto 6001
EXPOSE 6001

# Comando de inicio
CMD ["./main"]
