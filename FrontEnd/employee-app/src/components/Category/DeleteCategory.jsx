import React from "react";
import CategoryService from "../../services/CategoryService";

const DeleteCategory = ({ id, onDelete }) => {
  // 🔹 `handleDelete` se ejecuta cuando el usuario presiona el botón "Eliminar"
  const handleDelete = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta categoría?");
    if (!confirmDelete) return;

    try {
      // 🔹 Consultamos GraphQL para verificar si hay productos en la categoría antes de eliminarla
      const products = await CategoryService.getProductsByCategory(id);
      if (products.length > 0) {
        alert(" No se puede eliminar la categoría porque tiene productos asociados.");
        return;
      }

      // 🔹 Si no hay productos, eliminamos la categoría
      await CategoryService.deleteCategory(id);
      onDelete(); // 🔄 Recargamos la lista de categorías automáticamente
    } catch (error) {
      console.error(" Error eliminando categoría:", error);
      alert(" Error eliminando categoría. Intenta de nuevo.");
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}> Eliminar</button> // 🔹 Aquí conectamos el botón con `handleDelete`
  );
};

export default DeleteCategory;
