import React, { useState, useEffect } from "react";
import { createProduct } from "../../services/ProductService";
import { getCategories } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        price: "",
        stock: "",
        categoryId: "",
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // ✅ Verificar autenticación antes de cargar la página
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        if (!authStatus) {
            console.warn("Usuario no autenticado, redirigiendo a login...");
            navigate("/login");
            return;
        }

        loadCategories();
    }, [navigate]);

    // ✅ Cargar categorías disponibles
    const loadCategories = async () => {
        try {
            const data = await getCategories();
            if (data && Array.isArray(data.categories)) {
                setCategories(data.categories);
            } else {
                setCategories([]); // Evita que se rompa el `map()`
            }
        } catch (error) {
            console.error("Error cargando categorías:", error);
            alert("Hubo un problema al cargar las categorías. Inténtalo más tarde.");
        }
    };

    // ✅ Manejo de cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: name === "price" || name === "stock" ? Number(value) : value, // Convertir a número
        });
    };

    // ✅ Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(product);
            alert("Producto añadido correctamente");
            navigate("/dashboard/products");
        } catch (error) {
            console.error("Error añadiendo producto:", error);
            alert("Hubo un error al añadir el producto. Verifica los datos e intenta de nuevo.");
        }
    };

    return (
        <div>
            <h2>Añadir Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Nombre del Producto"
                    required
                />

                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Precio"
                    required
                />

                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Stock Disponible"
                    required
                />

                <select
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.length > 0 ? (
                        categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No hay categorías disponibles</option>
                    )}
                </select>

                <button type="submit">Añadir Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;
