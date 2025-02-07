import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/reducers/CategorySlice";
import { getProductsByCategory } from "../../store/reducers/productReducers";
import { FaStar, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

function Menu() {
  const dispatch = useDispatch();
  const { categories = [], loading: categoriesLoading } = useSelector(
    (state) => state.category || {}
  );
  const { products = [], loading: productsLoading } = useSelector(
    (state) => state.products || {}
  );
  const [selectedCategory, setSelectedCategory] = useState("");

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
  const filteredProducts = products.filter(
    (product) => product.category && product.category._id === selectedCategory
  );
  const getImageURL = (filename) => {
    return `http://localhost:5000/api/products/images/${filename}`;
  };

  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <section className="bg-gray-200 pb-12" id="our-menu">
      <div className="container mx-auto px-4">
        <div className="font-[sans-serif] bg-gray-100">
          <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 text-green-500">
                Menu
              </h2>
              <p className="mt-2 text-lg text-gray-700">
                Explore Our Best Menu
              </p>
            </div>
            <div className="flex justify-center space-x-4 mb-10">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-4 py-2 border rounded ${
                      filter === "all"
                        ? "bg-green-500 text-white"
                        : "bg-white text-green-500 border-green-500"
                    }`}
                  >
                    {category.name}
                  </button>
                ))
              ) : (
                <p>No categories available.</p>
              )}
              <Link to="/products">
                <button
                  className={`px-4 py-2 border rounded ${
                    filter === "all"
                      ? "bg-green-500 text-white"
                      : "bg-white text-green-500 border-green-500"
                  }`}
                >
                  More Food Products
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
              {!filteredProducts ? (
                <p>Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <p>No products found for this category.</p>
              ) : (
                filteredProducts.map((product) => (
                 
                  <div
                    key={product._id}
                    className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative"
                  >
                     <Link to={`/products/${product._id}`}>
                    <div className="mb-4 bg-gray-100 rounded p-2">
                      {product.image.slice(0, 1).map((filename, index) => (
                        <img
                          key={index}
                          src={getImageURL(filename)}
                          alt={`Product ${index + 1}`}
                          className="aspect-[33/35] w-full object-contain"
                        />
                      ))}
                    </div>
                    </Link>
                    <div>
                      <div className="flex gap-2">
                        <h5 className="text-base font-bold text-gray-800">
                          {product.title}
                        </h5>
                        <h6 className="text-base text-gray-800 font-bold ml-auto">
                          ${product.price}
                        </h6>
                      </div>
                      <p className="text-gray-500 text-[13px] mt-2 truncate">
                        <strong>குறிப்பு : </strong>
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2 mt-4">
                        
                        <button
                          type="button"
                          className="text-sm px-2 h-9 font-semibold w-full bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                        >
                          <Link to={`/products/${product._id}`}>
                            {product.available}
                          </Link>
                        </button>
                      </div>
                    </div>
                  </div>
              
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Menu;
