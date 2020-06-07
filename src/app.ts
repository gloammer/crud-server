import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
const {createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 8080;
app.use("/uploads", express.static(path.join(__dirname, "..", "/uploads")));
app.use(bodyParser.json());
app.use(cors());

console.log(path.join(__dirname, "..", "/uploads"));

// connect to db
mongoose
  .connect(
    "mongodb+srv://Team06:TTD07KlWDvD59Zrp@test-cluster-ggkus.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const products = require("./routers/product-router");
const categories = require("./routers/category-router");

app.use(createProxyMiddleware("/about", { target: "http://127.0.0.1:5000/" }));
app.use("/products", products);
app.use("/category", categories);


app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
