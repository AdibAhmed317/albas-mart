const CategoryModel = require('../models/CategoryModel');
const { verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

router.post('/', verifyTokenAndAdmin, async (req, res) => {
  const newCat = new CategoryModel(req.body);

  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});
