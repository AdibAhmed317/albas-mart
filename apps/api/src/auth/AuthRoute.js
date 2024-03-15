const router = require("express").Router();
const UserModel = require("../user/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
  const newUser = new UserModel({
    Name: req.body.Name,
    Email: req.body.Email,
    Address: req.body.Address,
    Password: CryptoJS.AES.encrypt(
      req.body.Password,
      process.env.PASS_SEC
    ).toString(),
    Phone: req.body.Phone,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      Email: req.body.Email,
    });

    if (!user) {
      return res.status(401).json("No user found");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.Password,
      process.env.PASS_SEC
    );

    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (Originalpassword !== req.body.Password) {
      return res.status(401).json("Invalid Password");
    }

    Originalpassword !== req.body.Password &&
      res.status(401).json("Invalid Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        Name: user.Name,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { Password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
