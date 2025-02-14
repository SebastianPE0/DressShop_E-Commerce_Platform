import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";
import DeleteCategory from "./DeleteCategory";
import { Link, useNavigate } from "react-router-dom";
import "./CategoryList.css"; 

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = localStorage.getItem("isAuthenticated") === "true";
        if (!authStatus) {
            console.warn("Usuario no autenticado, redirigiendo a login...");
            navigate("/login"); 
            return;
        }
    
        console.log("Usuario autenticado, cargando categorías...");
        loadCategories();
    }, []); // 👈 Evita recargar cada vez que `navigate` cambia

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(Array.isArray(data.categories) ? data.categories : []);
        } catch (error) {
            console.error("Error cargando categorías:", error);
            alert("Hubo un problema al cargar las categorías.");
        }
    };

    return (
        <div className="category-container">
            <h2 className="category-title">Lista de Categorías</h2>

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
                                        <button onClick={() => navigate(`/dashboard/edit-category/${category._id}`)} className="edit-button">
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
