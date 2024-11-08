const ProductModel = require("./ProductModel");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//Create Product
router.post("/create-product", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new ProductModel(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete Successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to get all products
router.get("/all", async (req, res) => {
  try {
    const { categories } = req.query;
    const query = categories === "all" ? {} : { categories: categories };

    const products = await ProductModel.find(query);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to get 8 products
router.get("/eight", async (req, res) => {
  try {
    const fiveProducts = await ProductModel.find().limit(8);
    res.status(200).json(fiveProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Single Product
router.get("/find/:id", async (req, res) => {
  try {
    const produtct = await ProductModel.findById(req.params.id);
    res.status(200).json(produtct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Single Search Product
router.get("/search/:title", async (req, res) => {
  try {
    const produtct = await ProductModel.find({ title: req.params.title });
    res.status(200).json(produtct);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
