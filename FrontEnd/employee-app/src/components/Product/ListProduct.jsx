import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/ProductService";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // ✅ Verificar autenticación correctamente
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        if (!authStatus) {
            console.warn("Usuario no autenticado, redirigiendo a login...");
            navigate("/login");
            return;
        }

        console.log("Usuario autenticado, cargando productos...");
        loadProducts(); // ✅ Llamar a la función correcta
    }, []);

    // ✅ Corrección: Llamar a `getProducts()` en lugar de `loadCategories()`
    const loadProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(Array.isArray(data.products) ? data.products : []);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    };

    return (
        <div>
            <h2>Lista de Productos</h2>
            <Link to="/dashboard/add-product" className="add-product-button">Añadir Producto</Link>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td>{product.categoryId}</td>
                                <td>
                                    <Link to={`/dashboard/edit-product/${product._id}`} className="edit-button">Editar</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay productos disponibles.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
