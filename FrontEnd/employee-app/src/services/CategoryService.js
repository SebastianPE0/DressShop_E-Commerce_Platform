import axios from "axios";

// URLs de los microservicios de Category en AWS EC2
const API_CREATE = 'http://ec2-54-224-136-157.compute-1.amazonaws.com:5004/category/create';

//const API_READ = process.env.REACT_APP_BACKEND_URL_READ_CATEGORY;

const API_READ='http://ec2-3-94-79-101.compute-1.amazonaws.com:80/categories';
const API_UPDATE = process.env.REACT_APP_BACKEND_URL_UPDATE_CATEGORY;
const API_DELETE = 'http://ec2-3-83-52-181.compute-1.amazonaws.com:5000/api/categories/';


// Función para obtener el token y agregarlo a los headers
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

// Obtener todas las categorías (READ)
export const getCategories = async () => {
    try {
        const response = await axios.get(API_READ, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo categorías", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Obtener una categoría por ID
export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${API_READ}/${id}`, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo categoría por ID", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Crear una nueva categoría (CREATE)
export const createCategory = async (category) => {
    try {
        const response = await axios.post(API_CREATE, {
            name: category.name,
            description: category.description
        }, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error creando categoría", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`${API_UPDATE}/${id}`, category, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error actualizando categoría", error.response ? error.response.data : error.message);
        throw error;
    }
};


export const deleteCategory = async (id) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No hay token disponible. Inicia sesión.");

        if (!id) {
            console.error("Error: El ID de la categoría es undefined.");
            return;
        }

        await axios.delete(`${API_DELETE}/${id}`, { // 👈 Ahora el `id` se concatena en la URL
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

    } catch (error) {
        console.error("Error eliminando categoría:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// **Verificar si el usuario está autenticado**
export const isAuthenticated = () => {
    return !!localStorage.getItem("token"); // Retorna true si hay token guardado
};

// **Exportar todas las funciones como un objeto CategoryService**
const CategoryService = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
    isAuthenticated, // ← Agregado para mantener la estructura igual a EmployeeService.js
};

export default CategoryService;
