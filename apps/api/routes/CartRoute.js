const CartModel = require("../models/CartModel");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const newCart = new CartModel({
    CartData: req.body.cartData,
  });
  try {
    const saveCart = newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    res.console.log(error);
  }
});
