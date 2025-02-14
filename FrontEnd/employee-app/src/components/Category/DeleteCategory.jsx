import React from "react";
import CategoryService from "../../services/CategoryService";

const DeleteCategory = ({ id, onDelete }) => {
  // 🔹 `handleDelete` se ejecuta cuando el usuario presiona el botón "Eliminar"
  const handleDelete = async () => {
    if (!id) {
      alert("Error: ID de categoría inválido.");
      return;
    }

    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      await CategoryService.deleteCategory(id);
      onDelete(); // 🔄 Recargamos la lista de categorías automáticamente
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      alert("Error eliminando categoría. Intenta de nuevo.");
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>Eliminar</button> 
  );
};

export default DeleteCategory;
