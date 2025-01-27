# Base Image
FROM golang:1.20

# Working directory
WORKDIR /app

# Copy dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Compile the service
RUN go build -o create-product-service main.go

# Expose service port
EXPOSE 8082

# Command to run the service

CMD ["./create-product-service"]
