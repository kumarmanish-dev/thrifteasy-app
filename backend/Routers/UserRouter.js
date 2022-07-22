import express from "express";
import User from "../Models/UserModel.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { generateToken, isLogged, hasAdminPerms } from "../Utils.js";

const UserRouter = express.Router();
UserRouter.get(
    "/",
    isLogged,
    hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const sellerRequest = req.query.sellerRequest || "";
        const sellerFilter = sellerRequest ? { sellerRequest } : {};
        const adminLevel = req.query.adminLevel || "";
        const adminLevelFilter = adminLevel ? { adminLevel } : {};
        const isSeller = req.query.isSeller || "";
        const isSellerFilter = isSeller ? { isSeller } : {};
        const users = await User.find({ ...sellerFilter, ...adminLevelFilter, ...isSellerFilter });
        res.send(users);
    })
);

UserRouter.get(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: "Could not find user" });
        }
    })
);

UserRouter.post(
    "/login",
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isSeller: user.isSeller,
                    adminLevel: user.adminLevel,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: "Invalid login credentials" });
    })
);

UserRouter.post(
    "/register",
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isSeller: createdUser.isSeller,
            adminLevel: createdUser.adminLevel,
            token: generateToken(createdUser),
        });
    })
);

UserRouter.put(
    "/profile",
    isLogged,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            user.seller.name = req.body.storeName || user.seller.name;
            user.seller.logo = req.body.logo || user.seller.logo;
            user.seller.description =
                req.body.description || user.seller.description;
            user.sellerRequest = req.body.sellerRequest || user.sellerRequest;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isSeller: updatedUser.isSeller,
                adminLevel: updatedUser.adminLevel,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: "Could not find user" });
        }
    })
);

UserRouter.put(
    "/makeadmin/:id",
    // isLogged,
    // hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.adminLevel = 1;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isSeller: updatedUser.isSeller,
                adminLevel: updatedUser.adminLevel,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: "Could not find user" });
        }
    })
);

UserRouter.put(
    "/removeadmin/:id",
    // isLogged,
    // hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.adminLevel = 0;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isSeller: updatedUser.isSeller,
                adminLevel: updatedUser.adminLevel,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: "Could not find user" });
        }
    })
);

UserRouter.put(
    "/makeseller/:id",
    // isLogged,
    // hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isSeller = true;
            user.sellerRequest = false;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isSeller: updatedUser.isSeller,
                adminLevel: updatedUser.adminLevel,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: "Could not find user" });
        }
    })
);

UserRouter.put(
    "/removeseller/:id",
    // isLogged,
    // hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isSeller = false;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isSeller: updatedUser.isSeller,
                adminLevel: updatedUser.adminLevel,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: "Could not find user" });
        }
    })
);

UserRouter.put(
    "/removesellerrequest/:id",
    // isLogged,
    // hasAdminPerms,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.sellerRequest = false;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                isSeller: updatedUser.isSeller,
                adminLevel: updatedUser.adminLevel,
                token: generateToken(updatedUser),
            });
        } else {
            res.status(404).send({ message: "Could not find user" });
        }
    })
);

export default UserRouter;
