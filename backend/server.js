import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import seedRouter from "./routes/seedRouter.js";
import productRouter from "./routes/productRouter.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoute.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected db");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIEVT_ID || "sd");
});

app.use("/api/seed", seedRouter);

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const __direname = path.resolve();
app.use(express.static(path.join(__direname, "/titi/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__direname, "/titi/build/index.html"))
);

app.use((req, res, next, err) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server is on port ${port}`);
});
