import Axios from "axios";
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    LIST_USER_FAIL,
    LIST_USER_REQUEST,
    LIST_USER_SUCCESS,
    CHANGE_USER_ADMIN_FAIL,
    CHANGE_USER_ADMIN_REQUEST,
    CHANGE_USER_ADMIN_SUCCESS,
    CHANGE_USER_SELLER_FAIL,
    CHANGE_USER_SELLER_REQUEST,
    CHANGE_USER_SELLER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_RESET,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    USER_SELLER_NAME,
} from "../Constants/UserConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const logIn = (email, password) => async (dispatch) => {
    dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await Axios.post("/api/users/login", {
            email,
            password,
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const register = (name, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: { name, email, password },
    });
    try {
        const { data } = await Axios.post("/api/users/register", {
            name,
            email,
            password,
        });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem("userData");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingDetails");
    dispatch({ type: USER_REGISTER_RESET });
    dispatch({ type: USER_LOGOUT });
};

export const detailsUser = (userID) => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userID });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        const { data } = await Axios.get(`/api/users/${userID}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_USER_PROFILE_REQUEST, payload: user });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        const { data } = await Axios.put("/api/users/profile", user, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: UPDATE_USER_PROFILE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        toast.success("Profile successfully updated");
        localStorage.setItem("userData", JSON.stringify(data));
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: UPDATE_USER_PROFILE_FAIL, payload: message });
        toast.error("Could not update profile");
    }
};

export const listUsers =
    ({ sellerRequest = "", adminLevel = "", isSeller = "" }) =>
    async (dispatch, getState) => {
        dispatch({ type: LIST_USER_REQUEST });
        try {
            const {
                userLogIn: { userData },
            } = getState();
            const { data } = await Axios.get(
                `/api/users?sellerRequest=${sellerRequest}&adminLevel=${adminLevel}&isSeller=${isSeller}`,
                {
                    headers: {
                        Authorization: `Bearer ${userData.token}`,
                    },
                }
            );
            dispatch({ type: LIST_USER_SUCCESS, payload: data });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({ type: LIST_USER_FAIL, payload: message });
        }
    };

export const changeUserAdmin = (user) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_USER_ADMIN_REQUEST, payload: user });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        if (!(user.adminLevel >= 1)) {
            await Axios.put(`/api/users/makeadmin/${user._id}`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            });
            toast.success("Admin rights granted for user");
        } else {
            await Axios.put(`/api/users/removeadmin/${user._id}`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            });
            toast.warning("Admin rights taken from user");
        }
        dispatch({ type: CHANGE_USER_ADMIN_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CHANGE_USER_ADMIN_FAIL, payload: message });
    }
};

export const changeUserSeller = (user) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_USER_SELLER_REQUEST, payload: user });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        if (!user.isSeller) {
            await Axios.put(`/api/users/makeseller/${user._id}`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            });
            toast.success("Seller rights granted for user");
        } else {
            await Axios.put(`/api/users/removeseller/${user._id}`, {
                headers: { Authorization: `Bearer ${userData.token}` },
            });
            toast.warning("Seller rights taken from user");
        }
        dispatch({ type: CHANGE_USER_SELLER_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CHANGE_USER_SELLER_FAIL, payload: message });
    }
};

export const changeUserSellerRequest = (user) => async (dispatch, getState) => {
    dispatch({ type: CHANGE_USER_SELLER_REQUEST, payload: user });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        await Axios.put(`/api/users/removesellerrequest/${user._id}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        toast.warning("Removed seller request");
        dispatch({ type: CHANGE_USER_SELLER_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CHANGE_USER_SELLER_FAIL, payload: message });
    }
};

export const updateStoreName = () => async (dispatch) => {
    dispatch({ type: USER_SELLER_NAME });
};
