import React, { useState } from "react";
import { createCategory } from "../../services/CategoryService";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState({ categoryname: "" });

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCategory(category);
            alert("Categoría añadida correctamente");
            navigate("/categories");
        } catch (error) {
            console.error("Error añadiendo categoría:", error);
        }
    };

    return (
        <div>
            <h2>Añadir Categoría</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="categoryname" value={category.categoryname} onChange={handleChange} placeholder="Nombre de la Categoría" required />
                <button type="submit">Añadir</button>
            </form>
        </div>
    );
};

export default AddCategory;
