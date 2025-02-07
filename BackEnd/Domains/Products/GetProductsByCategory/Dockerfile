FROM golang:1.20
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /app/get-products-category-service main.go
CMD ["/app/get-products-category-service"]
