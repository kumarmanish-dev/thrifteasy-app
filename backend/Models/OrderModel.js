import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderedItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
            },
        ],
        shippingDetails: {
            fullName: { type: String, required: true },
            contactNumber: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        paymentType: { type: String, required: true },
        paymentId: { type: String },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
        fundsToRelease: { type: Number, default: 0, required: true },
        paid: { type: Date },
        delivered: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
