const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    cart: {
      products: [
        {
          _id: String,
        },
      ],
      quantity: Number,
      total: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", CartSchema);
