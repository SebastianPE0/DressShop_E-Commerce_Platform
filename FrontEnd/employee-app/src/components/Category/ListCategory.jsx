import React, { useEffect, useState } from "react";
import { getCategories } from "../../services/CategoryService";

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

    return (
        <div className="container">
            <h2>Lista de Categorías</h2>
            <ul>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <li key={category._id}>{category.name}</li>
                    ))
                ) : (
                    <p>No hay categorías disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default CategoryList;
