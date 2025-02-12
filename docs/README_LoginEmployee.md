# 🔐 LoginEmployee Microservice

## 📖 Description
This microservice handles employee authentication through a **REST API** developed with **Java Spring Boot**, utilizing **AWS services** such as **EC2**, **RDS**, and **Cognito**.

The microservice verifies employee credentials by integrating **AWS Cognito**, ensuring secure authentication via **JWT tokens**. Additionally, **AWS RDS** is used to store employee authentication details, and **CORS** is implemented for security.

Moreover, **DevOps automation** is configured, meaning any change to the microservice triggers an **automatic deployment**, re-executing the updated image on **AWS EC2** with the latest modifications.

---

## 🚀 Technologies used
- ☕ **Java 21** with **Spring Boot**
- 🔐 **AWS Cognito** for authentication
- 🛢️ **Database:** MySQL on **AWS RDS**
- 📦 **ORM:** Spring Data JPA with Hibernate
- 🔧 **Configuration tools:** Spring Boot Starter
- 🌍 **CORS and JWT** for authentication and security
- 🛠 **MVC architecture** (controllers, services, repositories)
- 🐳 **Docker & DockerHub** (the image is stored on DockerHub)
- 🌐 **REST API**
- ⚙️ **DevOps** automation for deploying the microservice on **AWS EC2**

---

## ⚙️ Installation and configuration
The microservice is deployed on **AWS EC2** inside a **Docker container** running the microservice's image.

🚀 **Only the EC2 instance DNS URL is needed** to interact with the microservice.

---

## 📡 API Endpoints

### ➤ `POST http://DNS_AWS/login`
**Description:** Authenticates an employee and returns a JWT token.


json
  {
    "email": "juan.perez@example.com",
    "password": "securepassword"
  }
