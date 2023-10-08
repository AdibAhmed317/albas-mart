const CartModel = require('../models/CartModel');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyToken,
} = require('./verifyToken');

const router = require('express').Router();

//Create Cart
router.post('/', verifyToken, async (req, res) => {
  const newCart = new CartModel(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Cart
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await CartModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete Cart
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await CartModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Cart Delete Successfully.');
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Single Cart
router.get('/find/:userId', async (req, res) => {
  try {
    const cart = await CartModel.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All Cart
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await CartModel.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
