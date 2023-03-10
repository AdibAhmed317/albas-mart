const ProductModel = require('../models/ProductModel');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//Create Product
router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new ProductModel(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update Product
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
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
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Delete Successfully.');
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

//Get Single Product
router.get('/find/:id', async (req, res) => {
  try {
    const produtct = await ProductModel.findById(req.params.id);
    res.status(200).json(produtct);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
