import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";
import DeleteCategory from "./DeleteCategory"; // Importar el componente de eliminación
import { Link } from "react-router-dom";
import "./CategoryList.css"; 

import { useNavigate } from "react-router-dom";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        if (!authStatus) {
            console.warn("Usuario no autenticado, redirigiendo a login...");
            navigate("/login"); // Si no está autenticado, redirige al login
            return;
        }
    
        console.log("Usuario autenticado, cargando categorías...");
        loadCategories();
    }, [navigate]);

    

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(Array.isArray(data.categories) ? data.categories : []);
        } catch (error) {
            console.error("Error cargando categorías:", error);
            alert("Hubo un problema al cargar las categorías.");
        }
    };

    const handleAddCategory = () => {
        navigate("/add-category"); // Redirige sin problemas a la pantalla de añadir categoría
    };



    return (
        <div className="category-container">
            <h2 className="category-title">Lista de Categorías</h2>

            
            {/* Botón para agregar categoría (similar a empleados) */}
            <button style={{ marginBottom: "10px", padding: "10px", backgroundColor: "green", color: "white", borderRadius: "5px" }}>
                <Link to="/dashboard/add-category" style={{ textDecoration: "none", color: "white" }}>Añadir Categoría</Link>
            </button>

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

                                        <button 
                                            onClick={() => navigate(`/dashboard/edit-category/${category._id}`)} 
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>

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