import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, maxlength: 32 },
        email: { type: String, required: true, unique: true, maxlength: 70 },
        password: { type: String, required: true },
        isSeller: { type: Boolean, default: false, required: true },
        adminLevel: { type: Number, default: 0, required: true },
        seller: {
            name: { type: String, default: "None", required: true },
            logo: { type: String, default: "None", required: true },
            description: { type: String, default: "None", required: true },
            rating: { type: Number, default: 0, required: true },
            numOfReviews: { type: Number, default: 0, required: true },
        },
        sellerRequest: { type: Boolean, default: false, required: true },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
