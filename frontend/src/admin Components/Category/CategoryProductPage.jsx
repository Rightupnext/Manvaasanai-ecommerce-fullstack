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

      {/* Show loading while fetching categories */}
      {categoriesLoading ? <p>Loading categories...</p> : (
        <div>
          {categories.length > 0 ? categories.map((category) => (
            <button 
              key={category._id} 
              onClick={() => setSelectedCategory(category._id)}
              style={{
                margin: "5px",
                padding: "10px",
                background: selectedCategory === category._id ? "blue" : "gray",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              {category.name}
            </button>
          )) : <p>No categories available.</p>}
        </div>
      )}

      <h2>Products</h2>

      {/* Show loading while fetching products */}
      {productsLoading ? <p>Loading products...</p> : (
        filteredProducts.length === 0 ? <p>No products found.</p> : (
          <ul>
            {filteredProducts.map((product) => (
              <li key={product._id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <div>
                {product.image.map((filename, index) => (
                <img
                  key={index}
                  src={getImageURL(filename)}
                  alt={`Product ${index + 1}`}
                  style={{ width: "100px", height: "100px", marginRight: "10px" }}
                />
              ))}
                </div>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default CategoryProductPage;
