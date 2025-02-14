# 🏢 CreateEmployee Microservice

## 📖 Description
This microservice allows the creation of employees in the system through a REST API developed with Java SpringBoot using tools in AWS such as EC2 RDS and Cognito. The microservice connects to an RDS database in AWS to store the information for creating employees. Additionally, we implement the AWS Cognito service to use services such as JWT, that is, every time an employee is created in the microservice, it will validate that the user is valid and is not an unauthorized person. Likewise, the microservice is implemented with DEVOPS, which in case a change is made to the microservice, it automatically performs the process to re-execute the new image on our EC2 with the change made.

## 🚀 Technologies used
- ☕ **Java 21** with **Spring Boot**
- 🛢️ **Database:** MySQL on AWS RDS
- 📦 **ORM:** Spring Data JPA with Hibernate
- 🔧 **Configuration tools:** Spring Boot Starter
- 🌍 **CORS AND JWT** for security
- 🛠 **MVC architecture** (controllers, services, repositories)
- 🐳 **Docker AND DockerHub** the image is on dockerhub
- 🌐 **REST API**
- **DEVOPS** Automation to launch the microservice on AWS

---

## ⚙️ Installation and configuration
The microservice is launched on AWS in an EC2 within the instance we have a docker container where we have the image of the microservice inside.
ONLY THE DNS URL OF THE EC2 INSTANCE IS NEEDED 




