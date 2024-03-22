const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        _id: String,
        quantity: Number,
        price: Number,
      },
    ],
    items: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", CartSchema);
