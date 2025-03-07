const mongoose = require("mongoose");
const nutrientSchema = new mongoose.Schema({
  nutrientName: { type: String,  },
  valuePer100g: { type: String, },
  valuePerServing: { type: String, },
  dvPercent: { type: String,  },
});
const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountprice: { type: Number, required: true },
  offer: { type: String },
  packSize: { type: String },
  available: {
    type: String,
    enum: ["sold out", "available"],
    default: "available",
  },
  image: { type: Array, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  nutrients: [nutrientSchema],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
      date: { type: Date, default: Date.now },
    }
  ],
  
});

module.exports = mongoose.model("Product", productSchema);
