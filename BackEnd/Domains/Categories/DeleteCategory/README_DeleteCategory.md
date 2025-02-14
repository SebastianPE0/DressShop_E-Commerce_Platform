# 🗑️ DeleteCategory Microservice

## 📖 Description
This microservice allows the deletion of categories in the e-commerce platform via a **REST API** developed with **Node.js and Express**.

The microservice connects to **MongoDB Atlas** to remove category records and includes **JWT authentication with AWS Cognito**, ensuring that only authorized users can delete categories.

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

DELETE https//DNS_AWS/delete/{id}
