import React, { useEffect, useState } from "react";
import { getCategoryById, updateCategory } from "../../services/CategoryService";
import { useParams, useNavigate } from "react-router-dom";

const EditCategory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({ categoryname: "" });

    useEffect(() => {
        loadCategory();
    }, []);

    const loadCategory = async () => {
        try {
            const data = await getCategoryById(id);
            setCategory(data);
        } catch (error) {
            console.error("Error obteniendo categoría:", error);
        }
    };

    const handleChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCategory(id, category);
            alert("Categoría actualizada correctamente");
            navigate("/categories");
        } catch (error) {
            console.error("Error actualizando categoría:", error);
        }
    };

    return (
        <div>
            <h2>Editar Categoría</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="categoryname" value={category.categoryname} onChange={handleChange} placeholder="Nombre de la Categoría" required />
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default EditCategory;
