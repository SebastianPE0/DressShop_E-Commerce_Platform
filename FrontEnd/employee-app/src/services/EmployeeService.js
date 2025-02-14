import axios from "axios";

// URLs de los microservicios
const API_BASE_URL = "http://localhost"; // Cambia esto si usas un API Gateway
const API_CREATE = `http://98.82.98.218:8090/api/v1/employee/add`;
const API_READ = `http://54.205.137.190:8094/api/v1/employee`;
const API_UPDATE = `http://54.146.255.28:8092/api/v1/employees`;
const API_DELETE = `http://ec2-3-88-47-82.compute-1.amazonaws.com:8093/api/v1/employees/delete`;
const API_AUTH = `http://52.45.203.169:8091/auth`;

// Obtener empleados (READ)
export const getEmployees = async () => {
  try {
    const response = await axios.get(API_READ, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error obteniendo empleados", error.response ? error.response.data : error.message);
    throw error;
  }
};
const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible. Inicia sesión.");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};
//hello
export const createEmployee = async (employee) => {
  try {
    const response = await axios.post(API_CREATE, employee, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error creando empleado", error.response ? error.response.data : error.message);
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

export const updateEmployee = async (id, employee) => {
  try {
    const response = await axios.put(`${API_UPDATE}/${id}`, employee, authHeader());
    return response.data;
  } catch (error) {
    console.error("Error actualizando empleado", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const deleteEmployee = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible. Inicia sesión.");

    await axios.delete(`${API_DELETE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error eliminando empleado:", error.response ? error.response.data : error.message);
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
      { email, password },  // Enviar los datos en JSON
      {
        headers: {
          "Content-Type": "application/json", // Enviar datos en formato JSON
        }
      }
    );

    // Extraer el token del backend correctamente
    if (!response.data || !response.data.token) {
      throw new Error("Token no recibido en la respuesta del servidor.");
    }

    const token = response.data.token;

    // Almacenar el token en localStorage
    localStorage.setItem("token", token);
    
    return token;
  } catch (error) {
    console.error("Error iniciando sesión", error.response ? error.response.data : error.message);
    
    // Si el backend responde con 401, lanzar un error específico
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Credenciales incorrectas. Verifica tu correo y contraseña.");
      } else if (error.response.status === 400) {
        throw new Error("Solicitud incorrecta. Revisa los datos enviados.");
      } else if (error.response.status === 500) {
        throw new Error("Error interno en el servidor. Intenta más tarde.");
      }
    }

    throw new Error("Error de conexión. Verifica tu red e intenta de nuevo.");
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