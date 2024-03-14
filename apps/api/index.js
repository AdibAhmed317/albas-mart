const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
var cookieParser = require("cookie-parser");
var session = require("express-session");
const app = express();
app.use(cookieParser());
app.use(
  session({
    secret: "34SDgsdgspxxxxxxxdfsG",
    resave: false,
    saveUninitialized: true,
  })
);

const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const wishListRoute = require("./routes/wishlist.route");
const orderRoute = require("./routes/orderRoute");
const categoryRoute = require("./routes/categoryRoute");
const CartRoute = require("./routes/CartRoute");
const stripeRoute = require("./routes/stripe");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Welcome to Al-Raya Backend!");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/products", productRoute);
app.use("/api/wishlist", wishListRoute);
app.use("/api/orders", orderRoute);
app.use("/api/category", categoryRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/cart", CartRoute);

app.listen(5000, () => {
  console.log("server running");
});
