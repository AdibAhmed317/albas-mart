const WishListModel = require('../models/WishListModel');
const { verifyTokenAndAuthorization, verifyToken } = require('./verifyToken');

const router = require('express').Router();

// Create Wishlist
router.post('/', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Validate that both userId and productId are present in the request body
    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: 'userId and productId are required' });
    }

    // Find the wishlist for the provided userId
    const wishlist = await WishListModel.findOne({ userId });

    if (!wishlist) {
      // If the user's wishlist doesn't exist, create a new one and add the product
      const newWishlist = new WishListModel({
        userId,
        productId: [productId],
      });

      const savedWishlist = await newWishlist.save();
      return res.status(201).json(savedWishlist);
    }

    // Check if the productId already exists in the user's wishlist
    if (wishlist.productId.includes(productId)) {
      return res
        .status(400)
        .json({ error: 'Product already exists in the wishlist' });
    }

    // Add the new productId to the user's wishlist and save it
    wishlist.productId.push(productId);
    const updatedWishlist = await wishlist.save();

    // Send the updated Wishlist in the response
    res.status(200).json(updatedWishlist);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: 'Internal server error' });
  }
});

//All Wishlist
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await WishListModel.find({ userId }).populate(
      'productId',
      'title desc img categories size price'
    );

    const products = wishlistItems.map((item) => item.productId);

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// //Delete Wishlist
// router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
//   try {
//     await WishListModel.findByIdAndDelete(req.params.id);
//     res.status(200).json('Item Delete Successfully.');
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
