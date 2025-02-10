import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../../store/reducers/productReducers";
import { getCategories } from "../../store/reducers/CategorySlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();

  // Fetch products and categories from the Redux store
  const { products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  const getImageURL = (filename) => {
    return `http://localhost:5000/api/products/images/${filename}`;
  };
  

  return (
    <div>
    <h3 className="mb-3 mt-2 font-bold text-xl">Product List</h3>

{/* Show loading spinner while fetching products */}
{productsLoading && (
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
)}

{/* Show error messages if any */}
{productsError && <p>{productsError}</p>}

{/* Show loading spinner while fetching categories */}
{categoriesLoading && (
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
)}

{/* Show error messages if any */}
{categoriesError && <p>{categoriesError}</p>}

  
    <ul>
      {products.map((product, index) => (
        <li key={product._id} className="mb-6">
        <div className="space-y-2">
          <h3 className="text-black font-medium">Title: <span className="text-gray-600">{product.title}</span></h3>
          <h3 className="text-black font-medium">Price: <span className="text-gray-600">{product.price}</span></h3>
          <h3 className="text-black font-medium">Discount Price: <span className="text-gray-600">{product.discountprice}</span></h3>
          <h3 className="text-black font-medium">Description: <span className="text-gray-600">{product.description}</span></h3>
          <h3 className="text-black font-medium">Offer: <span className="text-gray-600">{product.offer}</span></h3>
          <h3 className="text-black font-medium">Pack Size: <span className="text-gray-600">{product.packSize}</span></h3>
          <h3 className="text-black font-medium">Available: <span className="text-gray-600">{product.available}</span></h3>
          <p className="text-black font-medium">
            Category: <span className="text-gray-600">{categories.find((cat) => cat._id === product.category)?.name || "N/A"}</span>
          </p>
        </div>

          <div>
            <h4 className="font-semibold mb-2">Images:</h4>
            <div className="flex flex-wrap gap-3">
              {product.image.map((filename, index) => (
                <img
                  key={index}
                  src={getImageURL(filename)}
                  alt={`Product ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md border border-gray-300"
                />
              ))}
            </div>
          </div>
  
          <div className="flex items-center gap-3">
            <Link 
              to={`edit/${product._id}`} 
              className="mt-3 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit
            </Link>
            
            <button 
              onClick={() => handleDeleteProduct(product._id)} 
              className="mt-3 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
  
          {/* Horizontal Line After Each Product */}
          {index !== products.length - 1 && <hr className="my-5 border-t border-gray-300" />}
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default ProductList;
