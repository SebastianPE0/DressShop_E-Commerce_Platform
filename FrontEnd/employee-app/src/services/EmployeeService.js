import axios from "axios";

// URLs de los microservicios
const API_BASE_URL = "http://localhost"; // Cambia esto si usas un API Gateway
const API_CREATE = `http://44.202.90.215:8090/api/v1/employee/add`;
const API_READ = `http://44.203.130.249:8094/api/v1/employee`;
const API_UPDATE = `http://54.91.89.233:8092/api/v1/employees`;
const API_DELETE = `http://3.86.201.108:8093/api/v1/employees/delete`;
const API_AUTH = `http://3.84.83.248:8091/auth`;

// Obtener empleados (READ)
export const getEmployees = async () => {

  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(API_READ, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo empleados", error);
    throw error;
  }
};
const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
// Crear un nuevo empleado (CREATE)
export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(API_CREATE, employee, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error creando empleado", error);
    throw error;
  }
};
 
 
  

// Obtener un empleado por ID
export const getEmployeeById = async (id) => {
  try {
      const response = await axios.get(`${API_READ}/${id}`);
      return response.data;
  } catch (error) {
      console.error("Error obteniendo empleado por ID", error);
      throw error;
  }
};

// Actualizar un empleado (UPDATE)
export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_UPDATE}/${id}`, employee,authHeader());
    return response.data;
  } catch (error) {
    console.error("Error actualizando empleado", error);
    throw error;
  }
};

// Eliminar un empleado (DELETE)
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_DELETE}/${id}`,authHeader());
  } catch (error) {
    console.error("Error eliminando empleado", error);
    throw error;
  }
};
// **Registro de Usuario (Signup)**
export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${API_AUTH}/signup`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error registrando usuario", error);
    throw error;
  }
};
// **Inicio de Sesión (Login)**
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_AUTH}/login`, 
      { email, password },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Asegurar formato correcto
        }
      }
    );

    const token = response.data;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Error iniciando sesión", error.response ? error.response.data : error.message);
    throw error;
  }
};

// **Cerrar Sesión (Logout)**
export const logout = () => {
  localStorage.removeItem("token");
};

// **Verificar si el usuario está autenticado**
export const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // Retorna true si hay token guardado
};
const EmployeeService = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  signUp,
  login,
  logout,
  isAuthenticated
};

export default EmployeeService;
