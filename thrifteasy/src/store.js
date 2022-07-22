import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/CartReducers";
import {
    adminDashboardDetailsReducer,
    orderAllListReducer,
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderPersonalListReducer,
    sellerDashboardDetailsReducer,
} from "./Reducers/OrderReducers";
import {
    productCreateReducer,
    productDeleteReducer,
    productDetailsReducer,
    productsListReducer,
    productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
    userChangeSellerReducer,
    userChangeAdminReducer,
    userDetailsReducer,
    usersListReducer,
    userRegisterReducer,
    userLogInReducer,
    userUpdateProfileReducer,
    updateStoreNameReducer,
} from "./Reducers/UserReducer";

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingDetails: localStorage.getItem("shippingDetails")
            ? JSON.parse(localStorage.getItem("shippingDetails"))
            : {},
        paymentType: "Cash on Delivery",
    },
    userLogIn: {
        userData: localStorage.getItem("userData")
            ? JSON.parse(localStorage.getItem("userData"))
            : null,
    },
};

const reducer = combineReducers({
    productsList: productsListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogIn: userLogInReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    userDetails: userDetailsReducer,
    orderPersonalList: orderPersonalListReducer,
    userUpdateProfile: userUpdateProfileReducer,
    productCreate: productCreateReducer,
    orderAllList: orderAllListReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    usersList: usersListReducer,
    userChangeAdmin: userChangeAdminReducer,
    userChangeSeller: userChangeSellerReducer,
    updateStoreName: updateStoreNameReducer,
    adminDashboardDetails: adminDashboardDetailsReducer,
    sellerDashboardDetails: sellerDashboardDetailsReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
