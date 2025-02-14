import React, { useState } from "react";
import { createCategory } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState({ name: "", description: "" });

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory(category);
            alert("Categoría añadida correctamente");
            navigate("/dashboard/categories"); //  Redirige correctamente a la lista de categorías
        } catch (error) {
            console.error("Error añadiendo categoría:", error);
        }
    };

    return (
        <div>
            <h2>Añadir Categoría</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={category.name} 
                    onChange={handleChange} 
                    placeholder="Nombre de la Categoría" 
                    required 
                />
                <input 
                    type="text" 
                    name="description" 
                    value={category.description} 
                    onChange={handleChange} 
                    placeholder="Descripción de la Categoría" 
                    required 
                />
                <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default AddCategory;
