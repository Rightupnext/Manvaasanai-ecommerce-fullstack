const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  shippingAddress: {
    fullName: { type: String, required: true },
    street: { type: String, required: true }, // Street address
    city: { type: String, required: true },
    state: { type: String, required: true }, // State
    postalCode: { type: String, required: true },
    phoneNumber: { type: String, required: true }, // Phone number
  },
  totalPrice: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Packed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
