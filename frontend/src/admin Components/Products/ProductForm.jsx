import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getProduct, updateProduct } from "../../store/reducers/productReducers";
import { getCategories } from "../../store/reducers/CategorySlice";
import { useNavigate, useParams } from "react-router-dom";

const ProductForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { categories } = useSelector((state) => state.category);
  const { product, loading, error } = useSelector((state) => state.products);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountprice: "",
    offer: "",
    packSize: "",
    available: "available",
    images: [],
    nutrients: [],
  });

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id));
    }
    dispatch(getCategories());
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        discountprice: product.discountprice || "",
        offer: product.offer || "",
        packSize: product.packSize || "",
        available: product.available || "available",
        images: [],
        nutrients: product.nutrients ? [...product.nutrients] : [],
      }));
    }
  }, [product]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: [...formData.images, e.target.files[0]] });
  };

  // Handle dynamic nutrient changes
  const handleNutrientChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedNutrients = prevFormData.nutrients.map((nutrient, i) =>
        i === index ? { ...nutrient, [name]: value } : nutrient
      );
      return { ...prevFormData, nutrients: updatedNutrients };
    });
  };
  

  // Add new nutrient field
  const addNutrient = () => {
    setFormData({
      ...formData,
      nutrients: [
        ...formData.nutrients,
        { nutrientName: "", valuePer100g: "", valuePerServing: "", dvPercent: "" },
      ],
    });
  };

  // Remove a nutrient field
  const removeNutrient = (index) => {
    const updatedNutrients = formData.nutrients.filter((_, i) => i !== index);
    setFormData({ ...formData, nutrients: updatedNutrients });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("discountprice", formData.discountprice);
    data.append("offer", formData.offer);
    data.append("packSize", formData.packSize);
    data.append("available", formData.available);

    formData.images.forEach((image) => data.append("images", image));
    data.append("nutrients", JSON.stringify(formData.nutrients));

    if (id) {
      dispatch(updateProduct({ id, formData: data }))
        .unwrap()
        .catch(console.error);
    } else {
      dispatch(addProduct(data))
        .unwrap()
        .catch(console.error);
    }
  };

  return (
    <div>
      <h2 className="mb-2 font-bold text-xl">{id ? "Update Product" : "Add Product"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="space-y-4">
  <div>
    <label className="block font-semibold mb-1">Product Title</label>
    <input 
      type="text" 
      name="title" 
      placeholder="Product Title" 
      value={formData.title} 
      onChange={handleChange} 
      required 
      className="w-full border border-gray-300 p-2 rounded-md"
    />
  </div>


  <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block font-semibold mb-1">Price</label>
    <input 
      type="number" 
      name="price" 
      placeholder="Price" 
      value={formData.price} 
      onChange={handleChange} 
      required 
      className="w-full border border-gray-300 p-2 rounded-md"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Discount Price</label>
    <input 
      type="number" 
      name="discountprice" 
      placeholder="Discount Price" 
      value={formData.discountprice} 
      onChange={handleChange} 
      required 
      className="w-full border border-gray-300 p-2 rounded-md"
    />
  </div>
</div>


  <div>
    <label className="block font-semibold mb-1">Offer</label>
    <input 
      type="text" 
      name="offer" 
      placeholder="Offer (e.g., 10% off)" 
      value={formData.offer} 
      onChange={handleChange} 
      className="w-full border border-gray-300 p-2 rounded-md"
    />
  </div>

  <div className="grid grid-cols-2 gap-4">
  <div>
    <label className="block font-semibold mb-1">Pack Size</label>
    <input 
      type="text" 
      name="packSize" 
      placeholder="Pack Size" 
      value={formData.packSize} 
      onChange={handleChange} 
      className="w-full border border-gray-300 p-2 rounded-md"
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Category</label>
    <select 
      name="category" 
      value={formData.category} 
      onChange={handleChange} 
      required 
      className="w-full border border-gray-300 p-2 rounded-md bg-white"
    >
      <option value="">Select a Category</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>
</div>

</div>


        <div className="flex flex-col">
          <label className="mt-3 font-semibold mb-2">Product Images:</label> 
          <div className="grid grid-cols-2 gap-4 mt-2"> {/* Grid layout with spacing */}
            {[1, 2, 3, 4].map((i) => (
              <input
                key={i}
                type="file"
                name={`image${i}`}
                onChange={handleFileChange}
                className="border border-gray-300 p-2 rounded-md w-full"
              />
            ))}
          </div>
        </div>




        {/* Dynamic Nutrient Fields */}
        <div>
  <h3 className="mb-2 mt-2 font-bold text-xl">Nutritional Information</h3>
  {formData.nutrients.map((nutrient, index) => (
    <div key={index} className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block font-semibold mb-1">Nutrient Name</label>
        <input 
          type="text" 
          name="nutrientName" 
          placeholder="Nutrient Name" 
          value={nutrient.nutrientName} 
          onChange={(e) => handleNutrientChange(index, e)} 
          required 
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Value per 100g</label>
        <input 
          type="number" 
          name="valuePer100g" 
          placeholder="Value per 100g" 
          value={nutrient.valuePer100g} 
          onChange={(e) => handleNutrientChange(index, e)} 
          required 
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Value per Serving</label>
        <input 
          type="number" 
          name="valuePerServing" 
          placeholder="Value per Serving" 
          value={nutrient.valuePerServing} 
          onChange={(e) => handleNutrientChange(index, e)} 
          required 
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">DV %</label>
        <input 
          type="number" 
          name="dvPercent" 
          placeholder="DV %" 
          value={nutrient.dvPercent} 
          onChange={(e) => handleNutrientChange(index, e)} 
          required 
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      <div className="col-span-2 flex justify-end">
        <button type="button" onClick={() => removeNutrient(index)} className="text-red-500 text-lg">❌</button>
      </div>
    </div>
  ))}

  <button type="button" onClick={addNutrient} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
    ➕ Add Nutrient
  </button>
</div>


        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white font-semibold ${
              loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : id ? "Update Product" : "Create Product"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ProductForm;
