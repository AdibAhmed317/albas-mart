const router = require('express').Router();
const UserModel = require('../models/UserModel');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register
router.post('/register', async (req, res) => {
  const newUser = new UserModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    phone: req.body.phone,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json('No user found');
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (Originalpassword !== req.body.password) {
      return res.status(401).json('Invalid Password');
    }
    Originalpassword !== req.body.password &&
      res.status(401).json('Invalid Password');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '3d' }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
