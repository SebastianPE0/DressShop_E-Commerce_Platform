# 🔄 UpdateCategory Microservice

## 📖 Description
This microservice allows updating category details in the e-commerce platform via a **REST API** developed with **Node.js and Express**.

The microservice connects to **MongoDB Atlas** to modify category records and includes **JWT authentication with AWS Cognito**, ensuring that only authorized users can update categories.

Moreover, **DevOps automation** is implemented, meaning any change to the microservice triggers an **automatic deployment**, re-executing the updated image on **AWS EC2**.

---

## 🚀 Technologies used
- 🟢 **Node.js (Express.js)**
- 🗄️ **Database:** MongoDB on **MongoDB Atlas**
- 🔑 **AWS Cognito** for authentication
- 🔧 **Mongoose** for MongoDB object modeling
- 🌍 **JWT & CORS** for security
- 🛠 **MVC architecture** (controllers, services, repositories)
- 🐳 **Docker & DockerHub** (image stored on DockerHub)
- 🌐 **REST API**
- ⚙️ **DevOps** automation for deploying the microservice on **AWS EC2**

---

## ⚙️ Installation and configuration

The microservice is deployed on **AWS EC2** inside a **Docker container** running the microservice's image.

🚀 **Only the EC2 instance DNS URL is needed** to interact with the microservice.


## 📡 API Endpoints
### ➤ `POST http://DNS_AWS/update/{id}`
**Description:** Authenticates an employee and returns a JWT token.

UpdateCategory/
│── src/
│   ├── config/                # Configuration files
│   │   ├── authMiddleware.js   # Middleware for JWT validation
│   │   ├── db.js               # MongoDB connection
│   │   ├── env.js              # Environment variables management
│   ├── controllers/            # Controllers handling API requests
│   │   ├── categoryController.js
│   ├── models/                 # Database schema definitions
│   │   ├── category.js
│   ├── repositories/           # Data access layer
│   │   ├── categoryRepository.js
│   ├── routes/                 # API route definitions
│   │   ├── categoryRoutes.js
│   ├── services/               # Business logic
│   │   ├── categoryService.js
│── .env                        # Environment variables (not included in repo)
│── .gitignore                   # Ignore node_modules and sensitive files
│── Dockerfile                   # Docker container configuration
│── package.json                 # Node.js dependencies
│── server.js                     # Main entry point of the application
