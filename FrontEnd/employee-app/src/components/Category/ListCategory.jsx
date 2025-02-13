import React, { useEffect, useState } from "react";
import { getCategories } from "../api/apiCore"; // Asegúrate de que esta función obtiene correctamente las categorías

const CategoriesList = () => {
    const [categories, setCategories] = useState([]);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            console.log("Categorías cargadas:", data); 
            setCategories(data.categories || []); // Asegurar que sea un array
        } catch (error) {
            console.error("Error cargando categorías:", error);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        console.log("Estado actualizado de categorías:", categories);
    }, [categories]);

    return (
        <div>
            <h2>Categorías</h2>
            <ul>
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <li key={category._id || category.id}>{category.name}</li>
                    ))
                ) : (
                    <p>No hay categorías disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default CategoriesList;