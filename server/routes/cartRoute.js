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
router.get('/find/:id', async (req, res) => {
  try {
    const produtct = await ProductModel.findById(req.params.id);
    res.status(200).json(produtct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get All Product
router.get('/', async (req, res) => {
  const qNew = req.query.new; // new = query name
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(10);
    } else if (qCategory) {
      products = await ProductModel.find({
        categories: { $in: [qCategory] },
      });
    } else {
      products = await ProductModel.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
