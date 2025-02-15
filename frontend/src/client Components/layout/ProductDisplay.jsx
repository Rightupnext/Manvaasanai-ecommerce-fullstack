import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/reducers/CategorySlice";
import { getProductsByCategory } from "../../store/reducers/productReducers";
import { Link } from "react-router-dom";
import Loader from "../../Loader";
import { MdOutlineFoodBank } from "react-icons/md";
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
    `${import.meta.env.VITE_BACKEND_URL}/api/products/images/${filename}`;
if(categoriesLoading){
  return(
    <Loader/>
  )
}
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
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 mt-[50px]">
          <ul className="space-y-2 font-medium mt-10">
           

         
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
                        <MdOutlineFoodBank className="w-6 h-6"/>
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
            
          
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="row">
  {productsLoading ? (
    <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
      <svg
        className="text-gray-300 animate-spin"
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
  ) : products.length === 0 ? (
    <p>No products found for this category.</p>
  ) : (
    <>
      <h3 className="section-title">
        {categories.find((cat) => cat._id === selectedCategory)?.name || "Products"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6">
        {products.map((product) => (
          <Link to={`/products/${product._id}`} key={product._id}>
            <div className="bg-white rounded p-4 cursor-pointer hover:-translate-y-1 transition-all relative">
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
                  <h5 className="text-base font-bold text-gray-800">{product.title}</h5>
                  <h6 className="text-base text-gray-800 font-bold ml-auto">₹{product.price}</h6>
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
            </div>
          </Link>
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
