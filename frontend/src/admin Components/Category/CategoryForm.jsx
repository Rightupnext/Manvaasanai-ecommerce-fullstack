import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  updateCategory,
  getCategories,
} from "../../store/reducers/CategorySlice";
import { useParams, useNavigate } from "react-router-dom";

const CategoryForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [name, setName] = useState("");

  useEffect(() => {
    if (id) {
      const category = categories.find((cat) => cat._id === id);
      if (category) {
        setName(category.name);
      } else {
        dispatch(getCategories());
      }
    }
  }, [id, categories, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryData = { name };
    if (id) {
      dispatch(updateCategory({ id, name: categoryData })).then(() =>
        navigate("/dashboard/category")
      );
    } else {
      dispatch(addCategory(categoryData)).then(() =>
        navigate("/dashboard/category")
      );
    }
  };

  return (
    <div>
      <h2>{id ? "Update Category" : "Add Category"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update" : "Add"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CategoryForm;
