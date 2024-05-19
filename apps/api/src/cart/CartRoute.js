const router = require('express').Router();
const CartModel = require('./CartModel');
const {
  verifyTokenAndAuthorization,
  verifyToken,
} = require('../middleware/verifyToken');

//Add to cart db
router.post('/', async (req, res) => {
  try {
    const { products, userId } = req.body;
    console.log(userId);

    if (!userId) {
      return res.status(404).json({ message: 'User Id not found' });
    }

    let existingCart = await CartModel.findOne({ userId });

    if (existingCart) {
      products.forEach((product) => {
        const existingProductIndex = existingCart.products.findIndex(
          (p) => p._id.toString() === product._id.toString()
        );

        if (existingProductIndex !== -1) {
          existingCart.products[existingProductIndex].quantity +=
            product.quantity;
        } else {
          existingCart.products.push({
            _id: product._id,
            quantity: product.quantity,
            price: product.price,
          });
        }
      });

      const uniqueProductIds = Array.from(
        new Set(existingCart.products.map((product) => product._id))
      );
      existingCart.items = uniqueProductIds.length;

      existingCart.total = existingCart.products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
      }, 0);

      existingCart = await existingCart.save();

      return res.status(200).json(existingCart);
    }

    const uniqueProductIds = Array.from(
      new Set(products.map((product) => product._id))
    );

    const total = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);

    const newCart = new CartModel({
      products: products.map((product) => ({
        _id: product._id,
        quantity: product.quantity,
        price: product.price,
      })),
      items: uniqueProductIds.length,
      total: total,
      userId: userId,
    });

    const savedCart = await newCart.save();

    res.status(201).json(savedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

//Get all cart by userId
router.get('/:userId', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await CartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Clear cart by userId
router.delete(
  '/clear-cart/:userId',
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const { userId } = req.params;
      await CartModel.deleteOne({ userId });
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

module.exports = router;
