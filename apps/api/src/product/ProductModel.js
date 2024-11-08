const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    StockQuantity: {
      type: Number,
      require: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
