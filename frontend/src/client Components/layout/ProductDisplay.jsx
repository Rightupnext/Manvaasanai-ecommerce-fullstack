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
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium mt-10">
           

            {/* Loading State */}
            {categoriesLoading ? (
              <p>Loading categories...</p>
            ) : (
              <>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li
                      key={category._id}
                      onClick={() => handleCategorySelect(category._id)}
                      className=" cursor-pointer"
                    >
                      <p
                        href="#"
                        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <svg
                          className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                        </svg>
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          {category.name}
                        </span>
                        {/* <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span> */}
                      </p>
                    </li>
                  ))
                ) : (
                  <p>No categories available.</p>
                )}
              </>
            )}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="row">
            {productsLoading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p>No products found for this category.</p>
            ) : (
              <>
                <h3 className="section-title">
                  {categories.find((cat) => cat._id === selectedCategory)
                    ?.name || "Products"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  
                  className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative"
                >
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
                  <div>
                    <div className="flex gap-2">
                      <h5 className="text-base font-bold text-gray-800">
                        {" "}
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
                      <div
                        className="bg-pink-100 hover:bg-pink-200 w-12 h-9 flex items-center justify-center rounded cursor-pointer"
                        title="Wishlist"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16px"
                          className="fill-pink-600 inline-block"
                          viewBox="0 0 64 64"
                        >
                          <path
                            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                            data-original="#000000"
                          />
                        </svg>
                      </div>
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
              ))}
            </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDisplay;
