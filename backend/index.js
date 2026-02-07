const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./src/config/db');
const cookieParser = require('cookie-parser');
const productRoutes = require('./src/routes/productRoutes');
const cartRoutes = require('./src/routes/cartRoutes');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
connectDB();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)
app.use(cookieParser());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));