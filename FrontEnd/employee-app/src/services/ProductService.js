import axios from "axios";

// URLs de los microservicios de Product en AWS EC2
const API_CREATE = process.env.REACT_APP_BACKEND_URL_CREATE_PRODUCT;
const API_READ = process.env.REACT_APP_BACKEND_URL_READ_PRODUCT;
const API_UPDATE = process.env.REACT_APP_BACKEND_URL_UPDATE_PRODUCT;
const API_DELETE = process.env.REACT_APP_BACKEND_URL_DELETE_PRODUCT;

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

// Obtener todos los productos (READ)
export const getProducts = async () => {
    try {
        const response = await axios.get(API_READ, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo productos", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_READ}/${id}`, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error obteniendo producto por ID", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Crear un nuevo producto (CREATE)
export const createProduct = async (product) => {
    try {
        const response = await axios.post(API_CREATE, product, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error creando producto", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Actualizar un producto (UPDATE)
export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_UPDATE}/${id}`, product, authHeader());
        return response.data;
    } catch (error) {
        console.error("Error actualizando producto", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Eliminar un producto (DELETE)
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_DELETE}/${id}`, authHeader());
    } catch (error) {
        console.error("Error eliminando producto", error.response ? error.response.data : error.message);
        throw error;
    }
};

// **Exportar todas las funciones como un objeto ProductService**
const ProductService = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default ProductService;
