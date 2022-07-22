import {
    ADD_TO_CART,
    ADD_TO_CART_FAIL,
    CLEAR_CART,
    REMOVE_FROM_CART,
    SAVE_PAYMENT_TYPE,
    SAVE_SHIPPING_DETAILS,
} from "../Constants/CartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(
                (x) => x.product === item.product
            );
            if (existItem) {
                // If product already exists in cart it gets replaced because qty can be updated else old cart items concat new cart items
                return {
                    ...state,
                    error:'', 
                    cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    error:'', 
                    cartItems: [...state.cartItems, item],
                };
            }
        case ADD_TO_CART_FAIL:
            return {...state}
        case REMOVE_FROM_CART:
            return {
                ...state,
                error:'',
                cartItems: state.cartItems.filter(
                    (x) => x.product !== action.payload
                ),
            };
        case SAVE_SHIPPING_DETAILS:
            return { ...state, shippingDetails: action.payload };
        case SAVE_PAYMENT_TYPE:
            return { ...state, paymentType: action.payload };
        case CLEAR_CART:
            return { ...state, error:'', cartItems: [] };
        default:
            return state;
    }
};
