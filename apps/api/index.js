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

const userRoute = require("./src/user/UserRoute");
const authRoute = require("./src/auth/AuthRoute");
const productRoute = require("./src/product/ProductRoute");
const wishListRoute = require("./src/wishlist/WishListRoute");
const orderRoute = require("./src/order/OrderRoute");
const categoryRoute = require("./src/category/CategoryRoute");
const CartRoute = require("./src/cart/CartRoute");
const stripeRoute = require("./src/payment/Stripe");

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
