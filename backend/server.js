import express from "express";
import mongoose from "mongoose";
import UserRouter from "./Routers/UserRouter.js";
import ProductRouter from "./Routers/ProductRouter.js";
import OrderRouter from "./Routers/OrderRouter.js";
import UploadRouter from "./Routers/UploadRouter.js";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost/thrifteasy");
// mongodb+srv://admin:Lol12345@cluster0.wbx6e.mongodb.net/?retryWrites=true&w=majority

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.use("/api/users", UserRouter);

app.use("/api/products", ProductRouter);

app.use("/api/orders", OrderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.use("/api/uploads", UploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const port = 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
