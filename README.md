# 🛒 DressShop E-Commerce Platform

## 📖 Description
**DressShop** is a fully functional **E-Commerce platform** designed to sell clothing products. The platform is built using a **microservices architecture**, where each domain operates independently and communicates through APIs.

The system integrates authentication via **AWS Cognito**, ensuring secure access. It also includes **DevOps automation**, where every change triggers an **automatic deployment**, updating the corresponding microservices running on **AWS EC2** instances.

This project follows a **scalable and distributed approach**, ensuring high availability and performance.

---

## 🚀 Technologies used

### **Frontend**
- ⚛️ **React.js** for UI development.
- 🌐 **Axios** for API communication.
- 🎨 **Styled Components / Tailwind CSS** (for UI styling).
### URL for the FRONTEND
- http://3.214.134.68/
```
http://3.214.134.68
```
### **Backend Microservices**
Each microservice is designed with different technologies and deployed as **independent services**.

### **Products Microservices (Go)**
- 🟡 **Go (Golang)**
- 🗄️ **MongoDB Atlas** for product storage.
- 📡 **REST API** for managing products.
- 🐳 **Docker & DockerHub** for containerization.
- developed in **Amazon Linux**
#### List of Microservices:
- CreateProduct
```
http://<HOST_AWS>:6001/product
```
```
{
   "name": "name_example",
   "price": 150,
   "stock": 10,
   "category_id": "category_id_example"
}
```
- DeleteProduct
```
http://<HOST_AWS>:8084/delete/<id>
```
- GetProductById
```
http://<HOST_AWS>:6002/products/<id>
```
- GetProducts
```
http://<HOST_AWS>:6002/products
```
- GetProductsByCategory
```
http://52.45.86.139:3001/products/category/<id>
```
- UpdateProduct
```
http://<HOST_AWS>/update/id
```

### **Categories Microservices (Node.js)**
- 🟢 **Node.js (Express.js)**
- 🗄️ **MongoDB Atlas** for category storage.
- 🔑 **AWS Cognito** for authentication.
- 🌍 **JWT & CORS** for security.
- ⚙️ **MVC architecture** (controllers, services, repositories).
- 📡 **REST API** for managing categories.
- developed in **Amazon Linux**
#### List of Microservices:
- CreateCategory
```
http://<HOST_AWS>:5004/category/create
```
```
{
  "name": "example_name",
  "description":"example_description"
}
```
- DeleteCategory
```
http://<HOST_AWS>:5000/api/categories/<id>
```
- GetCategorById
```
http://44.199.160.220:3000/api/category/<id>
```
- GetAllCategories
```
http://<HOST_AWS>:80/categories
```
- UpdateCategory
```
http://<HOST_AWS>/category/id
```

### **Employees Microservices (Spring Boot)**
- ☕ **Spring Boot (Java)**
- 🗄️ **MySQL RDS** for employee records.
- 🔐 **Spring Security** for authentication.
- 📡 **REST API** for CRUD operations.
- 🚀 **Spring Data JPA** for ORM.
- developed in **Ubuntu**
#### List of Microservices:
- CreateEmployee
```
http://98.82.98.218:8090/api/v1/employee/add
```
- DeleteEmployee
```
http://<HOST_AWS>:8093/api/v1/employees/delete
```
- LoginEmployee
```
http://52.45.203.169:8091/auth
```
- GetAllEmployee
```
http://54.205.137.190:8094/api/v1/employee
```
- UpdateEmployee
```
http://54.146.255.28:8092/api/v1/employees
```

### **GraphQL-Gateway (Node.js)**
- 🟢 **Node.js**
- 🔌 **Apollo GraphQL Server**
- 📡 **GraphQL API** for integrating Products, Categories & Employees.
- 🚀 **Middleware authentication with AWS Cognito**.
- developed in **Amazon Linux**
#### List of conections with Microservices:
- Gets called from CreateProduct and queries GetCategoryById
```
http://52.4.35.158:4000/graphql
```
```
{
  "query": "{ getCategoryById(id: \"<category_id>\") { id name } }"
}
```
- Gets called from DeleteCategory and queries GetProductsByCategory
```
http://52.4.35.158:4000/graphql
```
```
{
  "query": "{ getProductsByCategory(categoryId: \"<category_id>\") { id name } }"
}

```
---
#Architecture
![image](https://github.com/user-attachments/assets/9dcf2dbc-06aa-4db1-b2d7-9696ea9ac35a)


---

## ⚙️ Installation and Configuration

Each microservice is **deployed on AWS EC2** inside **Docker containers**, and updates are managed through **GitHub Actions (CI/CD)**.

### **Local setup:**
Clone the repository:
```
git clone https://github.com/SebastianPE0/DressShop_E-commerce_Platform.git
cd DressShop_E-commerce_Platform

```
