const UserModel = require("./UserModel");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//Get All User
router.get("/", verifyTokenAndAdmin, async (req, res) => {
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
router.get("/find/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { Password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get Stats
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await UserModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
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

//Delete User
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete Successfully.");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
