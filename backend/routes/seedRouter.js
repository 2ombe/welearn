import express from "express";
import Product from "../models/productModel";
import User from "../models/userModal";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});
seedRouter.get("/", async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

export default seedRouter;
