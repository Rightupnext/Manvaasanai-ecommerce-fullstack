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
              <button className={`px-4 py-2 border rounded ${
                      filter === "all"
                        ? "bg-green-500 text-white"
                        : "bg-white text-green-500 border-green-500"
                    }`}>More Food Products</button></Link>
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
        onClick={() => openModal(product)}
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
              <Link to={`/products/${product._id}`}>{product.available}</Link>
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

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4 sm:p-8"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full md:max-w-2xl lg:max-w-4xl h-[90vh] overflow-y-auto sm:p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-2xl text-gray-800 hover:text-red-500 focus:outline-none"
              onClick={closeModal}
            >
              &times;{" "}
              {/* You can replace this with an asterisk or another symbol */}
            </button>

            <img
              src={selectedItem.img}
              alt={selectedItem.heading}
              className="w-full sm:w-80 h-48 sm:h-72 object-cover rounded-lg mb-4 mx-auto"
            />
            <h2 className="text-2xl font-bold text-center text-gray-800">
              {selectedItem.heading}
            </h2>
            {/* <p className="text-xl font-bold text-center text-gray-800 mt-2">{selectedItem.price}</p> */}
            <p className="text-md text-gray-600 mt-4 leading-relaxed">
              {selectedItem.detail}
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                className="px-4 sm:px-6 py-2 bg-green-500 text-white rounded-full"
                onClick={closeModal}
              >
                Close
              </button>
              <a
                href="https://wa.me/+918870566255"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-4 sm:px-6 py-2 bg-green-500 text-white rounded-full"
              >
                <FaWhatsapp size={20} className="mr-2" />
                Contact
              </a>
            </div>
            {/* Nutritional Table */}
            {selectedItem.nutrition && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                  Nutritional Information
                </h3>
                <p className="text-md text-gray-600 mb-4 text-center">
                  Nutritive Value of {selectedItem.heading} (Per serving - 25gm)
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto border-separate border-spacing-0 rounded-lg shadow-md bg-white">
                    <thead className="bg-green-500 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">
                          Nutrient
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">
                          Value per 100g
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">
                          Value per Serving (25g)
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-100">
                          Dv Percent (25g)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                      {selectedItem.nutrition.map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-100 transition-colors"
                        >
                          <td className="px-6 py-4 border-b border-gray-200">
                            {item.nutrient}
                          </td>
                          <td className="px-6 py-4 border-b border-gray-200">
                            {item.value100g}
                          </td>
                          <td className="px-6 py-4 border-b border-gray-200">
                            {item.valueServing}
                          </td>
                          <td className="px-6 py-4 border-b border-gray-200">
                            {item.dvPercent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-bold text-gray-600 mt-4">
                  *Percent Daily Values are based on a 2000-kilocalorie diet.
                  Your daily values may be higher or lower depending on your
                  daily needs. The % daily value (DV) indicates how much a
                  nutrient in a serving of food contributes to a daily diet of
                  2000 calories.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export default Menu;
