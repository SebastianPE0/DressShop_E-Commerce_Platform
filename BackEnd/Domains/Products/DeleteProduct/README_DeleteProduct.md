# 🗑️ DeleteProduct Microservice

## 📖 Description
This microservice allows the deletion of products in the e-commerce platform via a **REST API** developed with **Go (Golang) and Gin framework**.

The microservice connects to **MongoDB Atlas** to remove product records and includes **JWT authentication with AWS Cognito**, ensuring that only authorized users can delete products.

Moreover, **DevOps automation** is implemented, meaning any change to the microservice triggers an **automatic deployment**, re-executing the updated image on **AWS EC2**.

---

## 🚀 Technologies used
- 🦫 **Go (Golang)**
- 📡 **Gin** (HTTP framework for Go)
- 🗄️ **Database:** MongoDB on **MongoDB Atlas**
- 🔑 **AWS Cognito** for authentication
- 🔧 **JWT Middleware** for authorization
- 🌍 **CORS & Security Middleware**
- 🛠 **MVC architecture** (controllers, services, repositories)
- 🐳 **Docker & DockerHub** (image stored on DockerHub)
- 🌐 **REST API**
- ⚙️ **DevOps** automation for deploying the microservice on **AWS EC2**

---

## ⚙️ Installation and configuration

The microservice is deployed on **AWS EC2** inside a **Docker container** running the microservice's image.

🚀 **Only the EC2 instance DNS URL is needed** to interact with the microservice.

STRUCTURE MUCROSERVICE 

DeleteProduct/
│── config/                     # Configuration files
│   ├── auth_middleware.go       # JWT authentication middleware
│   ├── env.go                   # Environment variables management
│   ├── mongo.go                 # MongoDB connection
│── controllers/                 # API controllers
│   ├── product_controller.go
│── models/                      # Data models
│   ├── products.go
│── repositories/                # Data access layer
│   ├── product_repository.go
│── routes/                      # API route definitions
│   ├── routes.go
│── services/                    # Business logic
│   ├── product_service.go
│── .env                         # Environment variables (not included in repo)
│── .gitignore                    # Ignore Go dependencies and sensitive files
│── Dockerfile                    # Docker container configuration
│── go.mod                         # Go module dependencies
│── go.sum                         # Go dependencies checksum
│── main.go                        # Main entry point of the application
