import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";
import DeleteCategory from "./DeleteCategory"; // Importar el componente de eliminación
import { Link } from "react-router-dom";
import "./CategoryList.css"; 

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(Array.isArray(data.categories) ? data.categories : []);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    return (
        <div className="category-container">
            <h2 className="category-title">Lista de Categorías</h2>
            <Link to="/add-category" className="add-category-button">Añadir Categoría</Link>
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
                                        <DeleteCategory id={category._id} onDelete={loadCategories} />
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
