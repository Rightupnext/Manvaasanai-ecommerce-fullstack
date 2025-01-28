import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/reducers/CategorySlice";
import { getProductsByCategory } from "../../store/reducers/productReducers";
import { Link } from "react-router-dom";

function ProductDisplay() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Toggle for mobile sidebar

  const { categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.category || {}
  );
  const { products = [], loading: productsLoading } = useSelector(
    (state) => state.products || {}
  );

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Set first category as default when categories load
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]._id);
    }
  }, [categories]);

  // Fetch products when category is selected
  useEffect(() => {
    if (selectedCategory) {
      console.log("Fetching products for category:", selectedCategory);
      dispatch(getProductsByCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    console.log("Selected Category:", categoryId);
    setSelectedCategory(categoryId);
    setIsSidebarOpen(false); // Close sidebar on mobile after selecting
  };

  // Function to generate product image URL
  const getImageURL = (filename) =>
    `http://localhost:5000/api/products/images/${filename}`;

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Toggle Button for Mobile Sidebar */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 10,
          background: "#007bff",
          color: "white",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
          display: "block",
        }}
      >
        ☰ Categories
      </button>

      {/* Sidebar for Categories */}
      <div
        style={{
          width: "250px",
          flexShrink: 0,
          background: "#f8f9fa",
          padding: "15px",
          overflowY: "scroll",
          position: "fixed",
          left: isSidebarOpen ? "0" : "-250px",
          top: "0",
          bottom: "0",
          transition: "left 0.3s ease-in-out",
          zIndex: 9,
          boxShadow: isSidebarOpen ? "2px 0px 5px rgba(0,0,0,0.2)" : "none",
        }}
      >
        <h3>Categories</h3>
        <button
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "red",
            color: "white",
            border: "none",
            padding: "5px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
        {categoriesLoading ? (
          <p>Loading categories...</p>
        ) : (
          <div style={{ marginTop: "50px" }}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id}>
                  <button
                    onClick={() => handleCategorySelect(category._id)}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "10px",
                      marginBottom: "5px",
                      background:
                        selectedCategory === category._id ? "blue" : "gray",
                      color: "white",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {category.name}
                  </button>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>
        )}
      </div>

      {/* Right Side: Product Display */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        {productsLoading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found for this category.</p>
        ) : (
          <div className="container mt-4">
            <h3 className="section-title">
              {categories.find((cat) => cat._id === selectedCategory)?.name ||
                "Products"}
            </h3>

            <div className="row">
              {products.map((product) => (
                <div className="col-md-4 col-lg-3 mb-4" key={product._id}>
                  <div className="card product-card">
                    {product.discount && (
                      <span className="discount-badge">{product.discount}</span>
                    )}

                    {product.image && product.image.length > 0 ? (
                      <img
                        className="card-img-top"
                        src={getImageURL(product.image[0])}
                        alt={product.title}
                        style={{
                          width: "100%",
                          height: "auto",
                          maxHeight: "150px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <p>No image available</p>
                    )}

                    <div className="card-body">
                      <h5 className="product-name">{product.title}</h5>
                      <p className="price">
                        Rs. {product.price}.00{" "}
                        {product.originalPrice && (
                          <span className="text-muted">
                            <del>Rs. {product.originalPrice}.00</del>
                          </span>
                        )}
                      </p>
                      <p className="rating">
                        ⭐ {product.rating} stars ({product.reviews} reviews)
                      </p>
                      {product.inStock ? (
                        <button className="btn btn-dark w-100">
                          Add to cart
                        </button>
                      ) : (
                        <Link to={`/products/${product._id}`}>
                          <button className="btn btn-secondary w-100">
                            View
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDisplay;
