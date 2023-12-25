const WishListModel = require('../models/WishListModel');
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken');

const router = require('express').Router();

// Create Wishlist
router.post('/', verifyToken, async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const existingWishListItem = await WishListModel.findOne({
      userId,
      productId,
    });

    if (existingWishListItem) {
      return res
        .status(400)
        .json({ message: 'Product already exists in the wishlist' });
    }

    const newWL = new WishListModel({ userId, productId });
    const savedWL = await newWL.save();

    res.status(200).json(savedWL);
  } catch (error) {
    res.status(500).json(error);
  }
});

//All Wishlist
router.get('/:userId', verifyToken, async (req, res) => {
  const userId = req.params.userId;

  try {
    const allWishlist = await WishListModel.find({ userId: userId });
    res.status(200).json(allWishlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get data' });
  }
});

//Delete Wishlist
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await WishListModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Item Delete Successfully.');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
