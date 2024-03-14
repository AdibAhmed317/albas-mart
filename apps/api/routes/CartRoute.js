const router = require("express").Router();
const CartModel = require("../models/CartModel");

router.post("/", async (req, res) => {
  try {
    const { products, quantity, total, userId } = req.body;
    const newCart = new CartModel({
      products,
      quantity,
      total,
      userId,
    });
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const userId = req.body;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
