import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  deleteCategory,
} from "../../store/reducers/CategorySlice";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div>
      <h1 className="text-bold text-4xl">Categories</h1>
      <Link to="add">Add Category</Link>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {categories.map((cat) => (
            <li key={cat._id}>
              {cat.name}
              <Link to={`/category/edit/${cat._id}`}>Edit</Link>
              <button onClick={() => handleDelete(cat._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesList;
