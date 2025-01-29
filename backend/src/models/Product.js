const mongoose = require("mongoose");
const nutrientSchema = new mongoose.Schema({
  nutrientName: { type: String,  },
  valuePer100g: { type: Number, },
  valuePerServing: { type: Number, },
  dvPercent: { type: Number,  },
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
      comment: { type: String },
      rating: { type: Number, min: 1, max: 5 },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
