import React, { useEffect, useState } from 'react';
import CategoryService from '../FrontEnd/employee-app/src/services/CategoryService';

const ListCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await CategoryService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListCategories;