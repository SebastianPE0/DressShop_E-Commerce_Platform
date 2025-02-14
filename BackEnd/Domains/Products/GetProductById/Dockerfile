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
RUN go build -o get-product-by-id-service main.go

# Expose service port
EXPOSE 6002

# Command to run the service

CMD ["./get-product-by-id-service"]
