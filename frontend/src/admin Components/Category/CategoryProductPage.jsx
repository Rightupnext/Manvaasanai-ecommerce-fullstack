import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../store/reducers/CategorySlice';
import { getProductsByCategory } from '../../store/reducers/productReducers';

const CategoryProductPage = () => {
  const dispatch = useDispatch();
  const { categories = [], loading: categoriesLoading } = useSelector((state) => state.category || {});
  const { products = [], loading: productsLoading } = useSelector((state) => state.products || {});
  const [selectedCategory, setSelectedCategory] = useState('');

  // Debugging
  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Selected Category:", selectedCategory);
  }, [categories, selectedCategory]);

  useEffect(() => {
    console.log("Updated Products:", products);
  }, [products]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Auto-select the first category when categories are loaded
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories]);

  // Fetch products when category is selected
  useEffect(() => {
    if (selectedCategory) {
      dispatch(getProductsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  // Filter products based on the selected category
  const filteredProducts = products.filter(product => product.category && product.category._id === selectedCategory);
  const getImageURL = (filename) => {
    return `http://localhost:5000/api/products/images/${filename}`;
  };
  return (
    <div>
    <h2>Product Categories</h2>
  
    {/* Show loading spinner while fetching categories */}
    {categoriesLoading ? (
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg
          className="w-16 h-16 animate-spin text-gray-900/50"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"
          ></path>
        </svg>
      </div>
    ) : (
      <div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              style={{
                margin: "5px",
                padding: "10px",
                background: selectedCategory === category._id ? "blue" : "gray",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              {category.name}
            </button>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
    )}
  </div>
  
  );
};

export default CategoryProductPage;
