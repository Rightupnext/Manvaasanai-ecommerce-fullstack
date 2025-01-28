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
      <h1>Product List</h1>
      {productsLoading && <p>Loading products...</p>}
      {productsError && <p>{productsError}</p>}
      {categoriesLoading && <p>Loading categories...</p>}
      {categoriesError && <p>{categoriesError}</p>}

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>Title: {product.title}</h3>
            <h3>Price: {product.price}</h3>
            <h3>DiscountPrice: {product.discountprice}</h3>
            <h3>Description: {product.description}</h3>
            <h3>offer: {product.offer}</h3>
            <h3>packSize: {product.packSize}</h3>
            <h3>available: {product.available}</h3>
            <p>Category: {categories.find((cat) => cat._id === product.category)?.name || "N/A"}</p>

            <div>
              <h4>Images:</h4>
              {product.image.map((filename, index) => (
                <img
                  key={index}
                  src={getImageURL(filename)}
                  alt={`Product ${index + 1}`}
                  style={{ width: "100px", height: "100px", marginRight: "10px" }}
                />
              ))}
            </div>

            <Link to={`/products/edit/${product._id}`}>Edit</Link>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
