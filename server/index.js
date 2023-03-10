const express = require('express');
const mongoose = require('mongoose');

const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');

const dotenv = require('dotenv');
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('db connected'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);

app.listen(5000, () => {
  console.log('server running');
});
