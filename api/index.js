import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import userRoutes from './routes/userRoute.js'
import authRoutes from './routes/authRoute.js'
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// DB connection
mongoose.connect(process.env.DB_URI, () =>
	console.log("DB Connection Established")
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT || 8000, () => console.log(`Server listening on ${PORT}`))