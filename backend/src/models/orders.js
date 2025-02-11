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
  totalPrice: { type: Number,  },
  subTotal: { type: Number,  },
  tax: { type: Number, },
  paymentType:{ type: String,
    enum: ["online", "cash"],
    default: "online"},
  amount:{type:Number},
  paymentId:{type:String},
  status: {
    type: String,
    enum: ['Pending', 'Packed', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
