import {
    LIST_ALL_ORDERS_REQUEST,
    LIST_ALL_ORDERS_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVER_ORDER_FAIL,
    DELIVER_ORDER_REQUEST,
    DELIVER_ORDER_SUCCESS,
    DETAILS_ORDER_FAIL,
    DETAILS_ORDER_REQUEST,
    DETAILS_ORDER_SUCCESS,
    LIST_PERSONAL_ORDERS_FAIL,
    LIST_PERSONAL_ORDERS_REQUEST,
    LIST_PERSONAL_ORDERS_SUCCESS,
    DETAILS_ADMIN_DASHBOARD_REQUEST,
    DETAILS_ADMIN_DASHBOARD_FAIL,
    DETAILS_ADMIN_DASHBOARD_SUCCESS,
    DETAILS_SELLER_DASHBOARD_REQUEST,
    DETAILS_SELLER_DASHBOARD_SUCCESS,
    DETAILS_SELLER_DASHBOARD_FAIL,
} from "../Constants/OrderConstants";
import Axios from "axios";
import { CLEAR_CART } from "../Constants/CartConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const createOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: order });
    try {
        const {
            userLogIn: { userData },
        } = getState();
        const { data } = await Axios.post("/api/orders", order, {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        });
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
        console.log(data.order)
        dispatch({ type: CLEAR_CART });
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createStripeOrder = (order) => async (dispatch, getState) => {
    dispatch({ type: CREATE_ORDER_REQUEST, payload: order });
    try {
        const {
            userLogIn: { userData },
        } = getState();
        const { data } = await Axios.post("/api/orders/stripe", order, {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        });
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order });
        dispatch({ type: CLEAR_CART });
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const detailsOrder = (orderID) => async (dispatch, getState) => {
    dispatch({ type: DETAILS_ORDER_REQUEST, payload: orderID });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/orders/${orderID}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: DETAILS_ORDER_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DETAILS_ORDER_FAIL, payload: message });
    }
};

export const listPersonalOrders = () => async (dispatch, getState) => {
    dispatch({ type: LIST_PERSONAL_ORDERS_REQUEST });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        const { data } = await Axios.get("/api/orders/customer", {
            headers: {
                Authorization: `Bearer ${userData.token}`,
            },
        });
        dispatch({ type: LIST_PERSONAL_ORDERS_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: LIST_PERSONAL_ORDERS_FAIL, payload: message });
    }
};

export const listAllOrders =
    ({ sellerID = "" }) =>
    async (dispatch, getState) => {
        dispatch({ type: LIST_ALL_ORDERS_REQUEST });
        const {
            userLogIn: { userData },
        } = getState();
        try {
            const { data } = await Axios.get(
                `/api/orders?sellerID=${sellerID}`,
                {
                    headers: { Authorization: `Bearer ${userData.token}` },
                }
            );
            dispatch({ type: LIST_ALL_ORDERS_SUCCESS, payload: data });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({ type: LIST_PERSONAL_ORDERS_FAIL, payload: message });
        }
    };

export const deleteOrder = (orderID) => async (dispatch, getState) => {
    dispatch({ type: DELETE_ORDER_REQUEST, payload: orderID });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        Axios.delete(`/api/orders/${orderID}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: DELETE_ORDER_SUCCESS });
        toast.warning("Order successfully deleted");
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DELETE_ORDER_FAIL, payload: message });
        toast.error("Could not delete order");
    }
};

export const deliverOrder = (orderID) => async (dispatch, getState) => {
    dispatch({ type: DELIVER_ORDER_REQUEST, payload: orderID });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        Axios.put(`/api/orders/${orderID}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: DELIVER_ORDER_SUCCESS });
        toast.success("Order successfully delivered");
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DELIVER_ORDER_FAIL, payload: message });
        toast.error("Could not deliver order");
    }
};

export const detailsAdminDashboard = () => async (dispatch, getState) => {
    dispatch({ type: DETAILS_ADMIN_DASHBOARD_REQUEST });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        const { data } = await Axios.get("/api/orders/admindashboard", {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: DETAILS_ADMIN_DASHBOARD_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DETAILS_ADMIN_DASHBOARD_FAIL, payload: message });
    }
};

export const detailsSellerDashboard = ({ sellerID = "" }) => async (dispatch, getState) => {
    dispatch({ type: DETAILS_SELLER_DASHBOARD_REQUEST });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/orders/sellerdashboard?sellerID=${sellerID}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: DETAILS_SELLER_DASHBOARD_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DETAILS_SELLER_DASHBOARD_FAIL, payload: message });
    }
};
