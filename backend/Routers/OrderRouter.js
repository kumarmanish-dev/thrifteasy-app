import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../Models/OrderModel.js";
import { hasAdminPerms, hasSellerPerms, isLogged } from "../Utils.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = Stripe(
    "sk_test_51L9FP8JZydxOk315H3WclsuwjBZ2xh0W9ygmp3dZeYnbBmxKtmFxMDsGeHZwzwU7Ml6wNEdKZGg7pMe5FvOlrdMe00PhdajGsE"
);

const OrderRouter = express.Router();

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

OrderRouter.get(
    "/",
    isLogged,
    hasSellerPerms,
    expressAsyncHandler(async (req, res) => {
        const seller = req.query.sellerID || "";
        const sellerFilter = seller ? { seller } : {};
        const orders = await Order.find({ ...sellerFilter }).populate(
            "user",
            "name"
        );
        res.send(orders);
    })
);

OrderRouter.get(
    "/admindashboard",
    isLogged,
    hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: "$totalPrice" },
                    fundsToRelease: { $sum: "$fundsToRelease" },
                },
            },
        ]);
        const dailySales = await Order.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    orders: { $sum: 1 },
                    sales: { $sum: "$totalPrice" },
                },
            },
        ]);
        const funds = await Order.aggregate([
            {
                $group: {
                    _id: "$seller",
                    fundsToRelease: { $sum: "$fundsToRelease" },
                },
            },
        ]);
        res.send([{ orders, dailySales, funds }]);
    })
);

OrderRouter.get(
    "/sellerdashboard",
    isLogged,
    hasSellerPerms,
    expressAsyncHandler(async (req, res) => {
        const _seller = req.query.sellerID || "";
        const orders = await Order.aggregate([
            { $match: { seller: ObjectId(`${_seller}`) } },
            {
                $group: {
                    _id: null,
                    numOrders: { $sum: 1 },
                    totalSales: { $sum: "$totalPrice" },
                    fundsToRelease: { $sum: "$fundsToRelease" },
                },
            },
        ]);
        const dailySales = await Order.aggregate([
            { $match: { seller: ObjectId(`${_seller}`) } },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    orders: { $sum: 1 },
                    sales: { $sum: "$totalPrice" },
                },
            },
        ]);
        res.send([{ orders, dailySales }]);
    })
);

OrderRouter.get(
    "/customer",
    isLogged,
    expressAsyncHandler(async (req, res) => {
        const orders = await Order.find({ user: req.user._id });
        res.send(orders);
    })
);

OrderRouter.post(
    "/",
    isLogged,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderedItems.length === 0) {
            res.status(400).send();
        } else {
            const order = new Order({
                seller: req.body.orderedItems[0].seller,
                orderedItems: req.body.orderedItems,
                shippingDetails: req.body.shippingDetails,
                paymentType: req.body.paymentType,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
                fundsToRelease:
                    req.body.totalPrice - (req.body.totalPrice / 100) * 5,
                user: req.user._id,
            });
            const createdOrder = await order.save();
            if (createdOrder) {
                res.status(201).send({
                    order: createdOrder,
                });
            } else {
                res.status(404).send({ message: "Could not find order" });
            }
        }
    })
);

OrderRouter.post(
    "/stripe",
    isLogged,
    expressAsyncHandler(async (req, res) => {
        if (req.body.orderedItems.length === 0) {
            res.status(400).send({ message: "Your cart is empty" });
        } else {
            const token = req.body.token;
            const charge = await stripe.charges.create({
                amount: req.body.totalPrice,
                currency: "usd",
                source: token.id,
            });
            const order = new Order({
                seller: req.body.orderedItems[0].seller,
                orderedItems: req.body.orderedItems,
                shippingDetails: req.body.shippingDetails,
                paymentType: req.body.paymentType,
                paymentId: charge.id,
                itemsPrice: req.body.itemsPrice,
                shippingPrice: req.body.shippingPrice,
                totalPrice: req.body.totalPrice,
                fundsToRelease:
                    req.body.totalPrice - (req.body.totalPrice / 100) * 5,
                user: req.user._id,
                paid: Date(),
            });
            const createdOrder = await order.save();
            res.status(201).send({
                order: createdOrder,
            });
        }
    })
);

OrderRouter.get(
    "/:id",
    isLogged,
    expressAsyncHandler(async (req, res) => {
        const order = await Order.findById(req.params.id);
        if (order) {
            res.send(order);
        } else {
            res.status(404).send({ message: "Could not find order" });
        }
    })
);

OrderRouter.delete(
    "/:id",
    isLogged,
    hasSellerPerms,
    expressAsyncHandler(async (req, res) => {
        const orderID = req.params.id;
        const order = await Order.findById(orderID);
        if (order) {
            const deleteOrder = await order.remove();
            res.send({
                order: deleteOrder,
            });
        } else {
            res.status(404).send({ message: "Could not find order" });
        }
    })
);

OrderRouter.put(
    "/:id",
    // isLogged,
    // hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const orderID = req.params.id;
        const order = await Order.findById(orderID);
        if (order) {
            order.delivered = Date();
            if (!order.paid) {
                order.paid = Date();
            }
            const updatedOrder = await order.save();
            res.send({
                order: updatedOrder,
            });
        } else {
            res.status(400).send({ message: "Could not find order" });
        }
    })
);

export default OrderRouter;
