import axios from "axios";

// URLs de los microservicios de Product en AWS EC2
const API_CREATE = "http://ec2-3-91-76-0.compute-1.amazonaws.com:6001/product";
//const API_READ =;
//const API_UPDATE = ;
//const API_DELETE =;

// Manejo de errores más claro
const handleError = (error, customMessage) => {
    if (error.response) {
        console.error(`${customMessage}:`, error.response.data);
        throw new Error(error.response.data.message || "Error en la operación.");
    } else if (error.request) {
        console.error(`${customMessage}: No se recibió respuesta del servidor.`);
        throw new Error("No se recibió respuesta del servidor. Verifica tu conexión.");
    } else {
        console.error(`${customMessage}:`, error.message);
        throw new Error(error.message);
    }
};

// Función para obtener el token y agregarlo a los headers
const authHeader = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.warn("⚠ No hay token disponible, redirigiendo a login...");
        window.location.href = "/login"; // Redirigir si no hay token
    }
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
        handleError(error, "Error obteniendo productos");
    }
};

// Obtener productos por categoría
export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_READ}?category=${categoryId}`, authHeader());
        return response.data;
    } catch (error) {
        handleError(error, "Error obteniendo productos por categoría");
    }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_READ}/${id}`, authHeader());
        return response.data;
    } catch (error) {
        handleError(error, "Error obteniendo producto por ID");
    }
};

// Crear un nuevo producto (CREATE)
export const createProduct = async (product) => {
    try {
        const response = await axios.post(API_CREATE, product, authHeader());
        return response.data;
    } catch (error) {
        handleError(error, "Error creando producto");
    }
};

// Actualizar un producto (UPDATE)
export const updateProduct = async (id, product) => {
    try {
        const response = await axios.put(`${API_UPDATE}/${id}`, product, authHeader());
        return response.data;
    } catch (error) {
        handleError(error, "Error actualizando producto");
    }
};

// Eliminar un producto (DELETE)
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_DELETE}/${id}`, authHeader());
    } catch (error) {
        handleError(error, "Error eliminando producto");
    }
};

// **Exportar todas las funciones como un objeto ProductService**
const ProductService = {
    getProducts,
    getProductsByCategory, // Nueva función añadida
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};

export default ProductService;
