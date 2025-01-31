import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "../../store/reducers/CategorySlice";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Edit icon
import { MdDelete } from "react-icons/md"; // Delete icon

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
      <h1 className="font-bold text-xl mb-4">Categories</h1>
      <Link to="add" className="text-blue-500 hover:text-blue-700 no-underline">Add Category</Link>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {categories.map((cat) => (
            <li key={cat._id} className="flex items-center justify-between border-b pb-2">
              <span>{cat.name}</span>
              <div className="flex space-x-3">
                <Link to={`/category/edit/${cat._id}`} className="text-blue-500 hover:text-blue-700">
                  <FaEdit size={20} />
                </Link>
                <button 
                  onClick={() => handleDelete(cat._id)} 
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete size={22} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesList;
