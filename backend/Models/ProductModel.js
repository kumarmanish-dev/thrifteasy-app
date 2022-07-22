import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        image: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        qtyInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        numOfReviews: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
