# 🏢 DeleteEmployee Microservice

## 📖 Description
This microservice allows the deletion of employees in the system through a REST API developed with Java Spring Boot, utilizing AWS tools such as **EC2**, **RDS**, and **Cognito**. 

The microservice connects to an **AWS RDS MySQL database** to remove employee records. Additionally, it implements **AWS Cognito** to validate authentication via **JWT tokens**, ensuring that only authorized users can delete employees. 

Moreover, **DEVOPS automation** is implemented, meaning that any change to the microservice will automatically trigger the deployment process, re-executing the updated image on **EC2** with the applied changes.

---

## 🚀 Technologies used
- ☕ **Java 21** with **Spring Boot**
- 🛢️ **Database:** MySQL on **AWS RDS**
- 📦 **ORM:** Spring Data JPA with Hibernate
- 🔧 **Configuration tools:** Spring Boot Starter
- 🌍 **CORS and JWT** for authentication and security
- 🛠 **MVC architecture** (controllers, services, repositories)
- 🐳 **Docker & DockerHub** (the image is stored on DockerHub)
- 🌐 **REST API**
- ⚙️ **DEVOPS** automation for deploying the microservice on AWS EC2

---

## ⚙️ Installation and configuration
The microservice is deployed on **AWS EC2** inside a **Docker container** running the microservice's image. 

🚀 **Only the EC2 instance DNS URL is needed** to interact with the microservice.

---


### ➤ `DELETE http://DNS_AWS/api/v1/employees/delete/{id}`
**Description:** Deletes an employee by their ID. 

STRUCTURE MICROSERVICE 
DeleteCategory/
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
