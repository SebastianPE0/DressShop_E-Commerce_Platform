import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../services/CategoryService";
import { Link } from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState([]); // Inicializa como array vacío

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            console.log("Categorías cargadas:", data); // <-- Agregar para depuración
            setCategories(Array.isArray(data) ? data : []); // Asegurar que sea un array
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")) {
            try {
                await deleteCategory(id);
                loadCategories(); // Recargar la lista después de eliminar
            } catch (error) {
                console.error("Error eliminando categoría:", error);
            }
        }
    };

    return (
        <div className="container">
            <h2>Lista de Categorías</h2>

            {/* Botón para agregar una nueva categoría */}
            <button style={{ marginBottom: "10px", padding: "10px", backgroundColor: "green", color: "white", borderRadius: "5px" }}>
                <Link to="/add-category" style={{ textDecoration: "none", color: "white" }}>Añadir Categoría</Link>
            </button>

            <ul>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <li key={category._id}>
                            {category.name}
                            
                            {/* Botón de Eliminar */}
                            <button onClick={() => handleDelete(category._id)} style={{ marginLeft: "10px", color: "red" }}>
                                Eliminar
                            </button>

                            {/* Botón de Editar */}
                            <button style={{ marginLeft: "10px", backgroundColor: "blue", color: "white", padding: "5px", borderRadius: "5px" }}>
                                <Link to={`/edit-category/${category._id}`} style={{ textDecoration: "none", color: "white" }}>
                                    Editar
                                </Link>
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No hay categorías disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default CategoryList;
