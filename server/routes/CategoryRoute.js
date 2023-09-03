const CategoryModel = require('../models/CategoryModel');
const { verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newCat = new CategoryModel({
    CategoryName: req.body.CategoryName,
  });
  try {
    const savedCat = await newCat.save();
    res.status(201).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
