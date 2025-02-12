import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/reducers/CategorySlice";
import { getProductsByCategory, getProducts } from "../../store/reducers/productReducers";
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
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts()); 
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory !== "all") {
      dispatch(getProductsByCategory(selectedCategory));
    } else {
      dispatch(getProducts()); 
    }
  }, [dispatch, selectedCategory]);


  const filteredProducts =
    selectedCategory === "all"
      ? products 
      : products.filter((product) => product.category && product.category._id === selectedCategory);

  const getImageURL = (filename) => {
    return `${import.meta.env.VITE_BACKEND_URL}/api/products/images/${filename}`;
  };

  return (
    <section className="bg-gray-200 pb-12" id="our-menu">
      <div className="container mx-auto px-4">
        <div className="font-[sans-serif] bg-gray-100">
          <div className="p-4 mx-auto lg:max-w-7xl md:max-w-4xl sm:max-w-xl max-sm:max-w-sm">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-800 text-green-500">Menu</h2>
              <p className="mt-2 text-lg text-gray-700">Explore Our Best Menu</p>
            </div>
            <div className="flex justify-center space-x-4 mb-10">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 border rounded ${
                  selectedCategory === "all" ? "bg-green-500 text-white" : "bg-white text-green-500 border-green-500"
                }`}
              >
                All
              </button>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`px-4 py-2 border rounded ${
                      selectedCategory === category._id ? "bg-green-500 text-white" : "bg-white text-green-500 border-green-500"
                    }`}
                  >
                    {category.name}
                  </button>
                ))
              ) : (
                <p>No categories available.</p>
              )}
              <Link to="/products">
                <button className="px-4 py-2 border rounded bg-white text-green-500 border-green-500">
                  More Food Products
                </button>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6 min-h-[200px]">
  {productsLoading ? (
    <div className="flex items-center justify-center w-full h-[200px]">
      <svg
        className="text-gray-300 animate-spin"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
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
                className="aspect-[33/25] w-full object-contain"
              />
            ))}
          </div>

          <div>
            <div className="flex gap-2">
              <h5 className="text-base font-bold text-gray-800">{product.title}</h5>
              <h6 className="text-base text-gray-800 font-bold ml-auto">₹{product.discountprice}</h6>
            </div>
            <p className="text-gray-500 text-[13px] mt-2 truncate">
              <strong>குறிப்பு : </strong>
              {product.description}
            </p>
            <div className="flex items-center gap-2 mt-4">
              <button
                type="button"
                className="text-sm px-2 h-9 font-semibold w-full bg-green-600 hover:bg-green-700 text-white tracking-wide ml-auto outline-none border-none rounded"
              >
                <Link to={`/products/${product._id}`}>{product.available}</Link>
              </button>
            </div>
          </div>
        </Link>
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
