# Base Image
FROM golang:1.22

# Working directory
WORKDIR /app

# Copy dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code
COPY . .

# Expose service port
EXPOSE 6002

RUN go build -o main .
# Command to run the service

CMD ["./main"]

