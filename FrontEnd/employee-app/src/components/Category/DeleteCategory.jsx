import React from 'react';
import CategoryService from "../../services/CategoryService";

const DeleteCategory = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      await CategoryService.deleteCategory(id);
      onDelete();
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      alert("Error eliminando categoría. Intenta de nuevo.");
    }
  };

  return <button onClick={handleDelete}>Eliminar</button>;
};

export default DeleteCategory;