import React from "react";
import CategoryService from "../../services/CategoryService";

const DeleteCategory = ({ id, onDelete }) => {
  // 🔹 `handleDelete` se ejecuta cuando el usuario presiona el botón "Eliminar"
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      // 🔹 Eliminamos la categoría directamente
      await CategoryService.deleteCategory(id);

      // 🔄 Recargamos la lista de categorías automáticamente
      onDelete();
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
