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
    <h2 className="font-bold text-xl">{id ? "Update Category" : "Add Category"}</h2>

      <form onSubmit={handleSubmit}>
      <div className="flex items-center space-x-4 w-1/2">
  <div className="flex-1">
    <label className="mb-2 mt-2 text-sl block">Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
      placeholder="Enter name"
      className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className={`mt-10 px-4 py-1.5 rounded-lg text-white font-semibold ${
      loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
    }`}
  >
    {loading ? "Saving..." : id ? "Update" : "Add"}
  </button>
</div>


      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CategoryForm;
