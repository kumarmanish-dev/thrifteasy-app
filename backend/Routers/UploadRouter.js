import multer from "multer";
import express from "express";
import { isLogged } from "../Utils.js";

const UploadRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/");
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });

UploadRouter.post("/", isLogged, upload.single("image"), (req, res) => {
    res.send(`/${req.file.path}`);
});

export default UploadRouter;
