import React, { useState, useEffect } from "react";
import { createProduct } from "../../services/ProductService"; // Solo importar `createProduct`
import { getCategories } from "../../services/CategoryService"; // Importar correctamente `getCategories`
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
        loadCategories();
    }, []);

    // Cargar categorías disponibles
    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(Array.isArray(data.categories) ? data.categories : []);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    // Manejo de cambios en los inputs
    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(product);
            alert("Producto añadido correctamente");
            navigate("/dashboard/products");
        } catch (error) {
            console.error("Error añadiendo producto:", error);
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
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>{category.name}</option>
                    ))}
                </select>

                <button type="submit">Añadir Producto</button>
            </form>
        </div>
    );
};

export default AddProduct;
