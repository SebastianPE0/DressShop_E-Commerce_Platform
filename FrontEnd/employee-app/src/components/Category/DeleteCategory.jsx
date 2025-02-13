import React from "react";
import CategoryService from "../../services/CategoryService";

const DeleteCategory = ({ id, onDelete }) => {
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      // 🔹 Verificar si la categoría tiene productos antes de eliminar
      const products = await CategoryService.getProductsByCategory(id);
      if (products.length > 0) {
        alert("No se puede eliminar la categoría porque tiene productos asociados.");
        return;
      }

      await CategoryService.deleteCategory(id);
      onDelete(); // Refrescar la lista después de eliminar
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      alert("Error eliminando categoría. Intenta de nuevo.");
    }
  };

  return <button onClick={handleDelete}>Eliminar</button>;
};

export default DeleteCategory;
