FROM golang:1.20

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o delete-product-service main.go

EXPOSE 8084

CMD ["./delete-product-service"]
