import Axios from "axios";
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    SAVE_SHIPPING_DETAILS,
    SAVE_PAYMENT_TYPE,
    ADD_TO_CART_FAIL,
} from "../Constants/CartConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addToCart = (productID, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${productID}`);
    const {
        cart: { cartItems },
    } = getState();
    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) {
        dispatch({
            type: ADD_TO_CART_FAIL,
        });
        toast.error(`Buy only from ${cartItems[0].seller.seller.name}`);
    } else {
        await Axios.put(`/api/products/updateqty/${productID}&${qty}`);
        dispatch({
            type: ADD_TO_CART,
            payload: {
                name: data.name,
                image: data.image,
                price: data.price,
                qtyInStock: data.qtyInStock,
                product: data._id, // for Database
                seller: data.seller,
                qty,
            },
        });
        toast.info("Added to cart");
        console.log(getState().cart.cartItems);
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    }
};

export const removeFromCart = (productID) => (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, payload: productID });
    localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
    );
};

export const saveShippingDetails = (data) => (dispatch) => {
    dispatch({ type: SAVE_SHIPPING_DETAILS, payload: data });
    localStorage.setItem("shippingDetails", JSON.stringify(data));
};

export const savePaymentType = (data) => (dispatch) => {
    dispatch({ type: SAVE_PAYMENT_TYPE, payload: data });
};
