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
    {productsLoading && <p>Loading products...</p>}
    {productsError && <p>{productsError}</p>}
    {categoriesLoading && <p>Loading categories...</p>}
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
