# 🔗 GraphQL-Gateway Microservice

## 📖 Description
The **GraphQL-Gateway** microservice acts as an intermediary between the different microservices in the e-commerce platform. It provides a **unified GraphQL API** to interact with the **Categories, Products, and Cart** microservices, enabling seamless data retrieval and mutation operations across services.

This microservice is responsible for:
- **Fetching and aggregating data** from multiple microservices.
- **Providing a single entry point** for queries and mutations using **GraphQL**.
- **Handling authentication** with **JWT & AWS Cognito**.
- **Ensuring efficient communication** between microservices.

---

## 🚀 Technologies used
- 🟢 **Node.js (Express.js)**
- 🔗 **GraphQL (Apollo Server)**
- 🛒 **Microservices:** Categories, Products, Cart
- 🔑 **AWS Cognito** for authentication
- 🔧 **JWT Middleware** for authorization
- 🛠 **GraphQL Schema & Resolvers** to handle data fetching
- 🌍 **CORS & Security Middleware**
- 🐳 **Docker & DockerHub** (image stored on DockerHub)
- ⚙️ **DevOps** automation for deploying the microservice on **AWS EC2**

---

## ⚙️ Installation and configuration

The microservice is deployed on **AWS EC2** inside a **Docker container** running the microservice's image.

🚀 **Only the EC2 instance DNS URL is needed** to interact with the microservice.

STRUCTURE MICROSERVICE 
GraphQL-Gateway/
│── src/
│   ├── config/                # Configuration files
│   │   ├── authMiddleware.js   # JWT authentication middleware
│   │   ├── env.js              # Environment variables management
│   ├── graphql/               # GraphQL schema and resolvers
│   │   ├── resolvers.js        # Logic for querying & mutating data
│   │   ├── schema.js           # GraphQL schema definitions
│   ├── services/              # Communication with microservices
│   │   ├── categoryService.js  # Calls Category microservice
│   │   ├── CartService.js      # Calls Cart microservice
│── .env                        # Environment variables (not included in repo)
│── .gitignore                   # Ignore node_modules and sensitive files
│── Dockerfile                   # Docker container configuration
│── package.json                 # Node.js dependencies
│── server.js                     # Main entry point of the application
│── app.js                        # Express server setup
