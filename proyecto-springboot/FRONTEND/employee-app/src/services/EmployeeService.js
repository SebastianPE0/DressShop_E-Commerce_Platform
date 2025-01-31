import axios from "axios";

// URLs de los microservicios
const API_BASE_URL = "http://localhost"; // Cambia esto si usas un API Gateway
const API_CREATE = `${API_BASE_URL}:8081/api/employees`;
const API_READ = `${API_BASE_URL}:8082/api/employees`;
const API_UPDATE = `${API_BASE_URL}:8083/api/employees`;
const API_DELETE = `${API_BASE_URL}:8084/api/employees`;

// Obtener empleados (READ)
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_READ);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo empleados", error);
    throw error;
  }
};

// Crear un nuevo empleado (CREATE)
export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(API_CREATE, employee);
    return response.data;
  } catch (error) {
    console.error("Error creando empleado", error);
    throw error;
  }
};

// Actualizar un empleado (UPDATE)
export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_UPDATE}/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error("Error actualizando empleado", error);
    throw error;
  }
};

// Eliminar un empleado (DELETE)
export const deleteEmployee = async (id) => {
  try {
    await axios.delete(`${API_DELETE}/${id}`);
  } catch (error) {
    console.error("Error eliminando empleado", error);
    throw error;
  }
};
