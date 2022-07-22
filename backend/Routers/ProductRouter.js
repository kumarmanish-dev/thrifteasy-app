import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../Models/ProductModel.js";
import { isLogged, hasSellerPerms } from "../Utils.js";

const ProductRouter = express.Router();

ProductRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
        const seller = req.query.sellerID || "";
        const name = req.query.productName || "";
        const sellerFilter = seller ? { seller } : {};
        const nameFilter = name
            ? { name: { $regex: name, $options: "i" } }
            : {};
        const products = await Product.find({
            ...sellerFilter,
            ...nameFilter,
        })
            .populate("seller", "seller")
            .sort({ _id: -1 });
        res.send(products);
    })
);

ProductRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate(
            "seller"
        );
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: "Could not find product" });
        }
    })
);

ProductRouter.post(
    "/addproduct",
    isLogged,
    hasSellerPerms,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: req.body.productName,
            seller: req.body.productSellerID,
            image: req.body.productImage,
            price: req.body.productPrice,
            category: req.body.productCategory,
            brand: req.body.productBrand,
            qtyInStock: req.body.productQtyInStock,
            rating: 5,
            numOfReviews: 5,
            description: req.body.productDescription,
        });
        const createdProduct = await product.save();
        res.send({ product: createdProduct });
    })
);

ProductRouter.put(
    "/:id",
    isLogged,
    hasSellerPerms,
    expressAsyncHandler(async (req, res) => {
        const productID = req.params.id;
        const product = await Product.findById(productID);
        if (product) {
            product.name = req.body.productName;
            product.price = req.body.productPrice;
            product.image = req.body.productImage;
            product.category = req.body.productCategory;
            product.brand = req.body.productBrand;
            product.qtyInStock = req.body.productQtyInStock;
            product.description = req.body.productDescription;
            const updatedProduct = await product.save();
            res.send({
                product: updatedProduct,
            });
        } else {
            res.status(404).send({ message: "Could not find product" });
        }
    })
);

ProductRouter.put(
    "/updateqty/:productID&:qty",
    expressAsyncHandler(async (req, res) => {
        const productID = req.params.productID;
        const qty = req.params.qty;
        const product = await Product.findById(productID);
        if (product) {
            product.qtyInStock = product.qtyInStock - qty;
            const updatedProduct = await product.save();
            res.send({
                product: updatedProduct,
            });
        } else {
            res.status(404).send({ message: "Could not find product" });
        }
    })
);

ProductRouter.delete(
    "/:id",
    isLogged,
    hasSellerPerms,
    expressAsyncHandler(async (req, res) => {
        const productID = req.params.id;
        const product = await Product.findById(productID);
        if (product) {
            const deleteProduct = await product.remove();
            res.send({
                product: deleteProduct,
            });
        } else {
            res.status(404).send({ message: "Could not find product" });
        }
    })
);

export default ProductRouter;
