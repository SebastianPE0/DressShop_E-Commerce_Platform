import axios from "axios";

// URLs de los microservicios de Category en AWS EC2
const API_CREATE = process.env.REACT_APP_BACKEND_URL_CREATE_CATEGORY;
const API_READ = process.env.REACT_APP_BACKEND_URL_READ_CATEGORY;
const API_UPDATE = process.env.REACT_APP_BACKEND_URL_UPDATE_CATEGORY;
const API_DELETE = process.env.REACT_APP_BACKEND_URL_DELETE_CATEGORY;

/*// Función para obtener el token almacenado en localStorage
const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token disponible. Inicia sesión.");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};*/

export const getCategories = async () => {
  try {
    const response = await fetch(API_READ);
    const data = await response.json();
    
    console.log("Respuesta de la API:", data); // <-- Agregar para depuración

    return data.categories || []; // <-- Asegurar que sea un array
  } catch (error) {
    console.error("Error obteniendo categorías:", error);
    return []; // Devuelve un array vacío si hay error
  }
};


// **Crear una nueva categoría (CREATE)**
export const createCategory = async (category) => {
  try {
    const response = await axios.post(API_CREATE, category,);
    return response.data;
  } catch (error) {
    console.error("Error creando categoría", error.response ? error.response.data : error.message);
    throw error;
  }
};

// **Obtener una categoría por ID**
export const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_READ}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo categoría por ID", error);
    throw error;
  }
};

// **Actualizar una categoría (UPDATE)**
export const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${API_UPDATE}/${id}`, category);
    return response.data;
  } catch (error) {
    console.error("Error actualizando categoría", error.response ? error.response.data : error.message);
    throw error;
  }
};

// **Eliminar una categoría (DELETE)**
export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_DELETE}/${id}`);
  } catch (error) {
    console.error("Error eliminando categoría", error.response ? error.response.data : error.message);
    throw error;
  }
};

// **Exportar el servicio de categorías**
const CategoryService = {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory
};

export default CategoryService;
