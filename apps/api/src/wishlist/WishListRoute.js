const WishListModel = require("./WishListModel");
const { verifyToken } = require("../middleware/verifyToken");

const router = require("express").Router();

// Create Wishlist
router.post("/", verifyToken, async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ error: "userId and productId are required" });
    }

    const wishlist = await WishListModel.findOne({ userId });

    if (!wishlist) {
      const newWishlist = new WishListModel({
        userId,
        productId: [productId],
      });

      const savedWishlist = await newWishlist.save();
      return res.status(200).json(savedWishlist);
    }

    if (wishlist.productId.includes(productId)) {
      return res
        .status(400)
        .json({ error: "Product already exists in the wishlist" });
    }

    wishlist.productId.push(productId);
    const updatedWishlist = await wishlist.save();

    res.status(200).json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

//Wishlist by user
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlistItems = await WishListModel.find({ userId }).populate(
      "productId",
      "title desc img categories size price"
    );

    // Return directly the array of product objects obtained from wishlistItems
    res.status(200).json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// //Delete Wishlist
router.delete("/:userId/:productId", verifyToken, async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const updatedWishlist = await WishListModel.findOneAndUpdate(
      { userId: userId },
      { $pull: { productId: productId } },
      { new: true }
    );

    if (!updatedWishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
});

module.exports = router;
