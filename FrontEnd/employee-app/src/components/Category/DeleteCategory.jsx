import React from 'react';
import CategoryService from "../../services/CategoryService";

const DeleteCategory = ({ id, onDelete }) => {
  const handleDelete = async () => {
    await CategoryService.deleteCategory(id);
    onDelete();
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteCategory;