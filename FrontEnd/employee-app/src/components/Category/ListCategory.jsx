import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../services/CategoryService";
import { Link } from "react-router-dom";
import "./CategoryList.css"; // Importar el archivo CSS

const CategoryList = () => {
    const [categories, setCategories] = useState([]); // Inicializa como array vacío

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            console.log("Categorías cargadas:", data);
    
            // Extraer el array correcto dentro de `data.categories`
            setCategories(Array.isArray(data.categories) ? data.categories : []);
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
        <div className="category-container">
            <h2 className="category-title">Lista de Categorías</h2>

            {/* Botón para agregar una nueva categoría */}
            <Link to="/add-category" className="add-category-button">Añadir Categoría</Link>

            {/* Tabla para mostrar categorías */}
            <div className="category-table-container">
                <table className="category-table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map(category => (
                                <tr key={category._id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button className="delete-button" onClick={() => handleDelete(category._id)}>Eliminar</button>
                                        <Link to={`/edit-category/${category._id}`} className="edit-button">Editar</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="no-categories">No hay categorías disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;
