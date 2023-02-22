const UserModel = require('../models/UserModel');
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//Get All User
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new; // new = query name
  try {
    const user = query
      ? await UserModel.find().sort({ _id: -1 }).limit(1)
      : await UserModel.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get One User
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json('Delete Successfully.');
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
