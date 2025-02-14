# 🏢 GetAllEmployee Microservice

## 📖 Description
This microservice retrieves a list of all employees in the system through a **REST API** developed with **Java Spring Boot**, leveraging AWS tools such as **EC2**, **RDS**, and **Cognito**.

The microservice connects to an **AWS RDS MySQL database** to fetch employee records. Additionally, **AWS Cognito** is implemented to ensure authentication via **JWT tokens**, allowing only authorized users to access employee data.

Moreover, **DevOps automation** is integrated, meaning any change to the microservice triggers an automatic deployment, re-executing the updated image on **AWS EC2** with the latest modifications.

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
- ⚙️ **DevOps** automation for deploying the microservice on **AWS EC2**

---

## ⚙️ Installation and configuration
The microservice is deployed on **AWS EC2** inside a **Docker container** running the microservice's image. 

🚀 **Only the EC2 instance DNS URL is needed** to interact with the microservice.

---

## 📡 API Endpoints

### ➤ `GET http:/DNS_AWS/api/v1/employee/{id}`

