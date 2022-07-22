import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    LIST_USER_FAIL,
    LIST_USER_REQUEST,
    LIST_USER_SUCCESS,
    CHANGE_USER_ADMIN_FAIL,
    CHANGE_USER_ADMIN_REQUEST,
    CHANGE_USER_ADMIN_RESET,
    CHANGE_USER_ADMIN_SUCCESS,
    CHANGE_USER_SELLER_FAIL,
    CHANGE_USER_SELLER_REQUEST,
    CHANGE_USER_SELLER_RESET,
    CHANGE_USER_SELLER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    UPDATE_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_RESET,
    UPDATE_USER_PROFILE_SUCCESS,
    USER_SELLER_NAME,
    USER_SELLER_NAME_RESET,
    USER_REGISTER_RESET,
} from "../Constants/UserConstants";

export const userLogInReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userData: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT:
            return {};
        default:
            return state;
    }
};

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        case USER_REGISTER_SUCCESS:
            return { loading: false, userData: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        case USER_REGISTER_RESET:
            return {};
        default:
            return state;
    }
};

export const userDetailsReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER_PROFILE_REQUEST:
            return { loading: true };
        case UPDATE_USER_PROFILE_SUCCESS:
            return { loading: false, success: true };
        case UPDATE_USER_PROFILE_FAIL:
            return { loading: false, error: action.payload };
        case UPDATE_USER_PROFILE_RESET:
            return {};
        default:
            return state;
    }
};

export const usersListReducer = (state = { loading: true }, action) => {
    switch (action.type) {
        case LIST_USER_REQUEST:
            return { loading: true };
        case LIST_USER_SUCCESS:
            return { loading: false, users: action.payload };
        case LIST_USER_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const userChangeAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_USER_ADMIN_REQUEST:
            return { loading: true };
        case CHANGE_USER_ADMIN_SUCCESS:
            return { loading: true, success: true };
        case CHANGE_USER_ADMIN_FAIL:
            return { loading: true, error: action.payload };
        case CHANGE_USER_ADMIN_RESET:
            return {};
        default:
            return state;
    }
};

export const userChangeSellerReducer = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_USER_SELLER_REQUEST:
            return { loading: true };
        case CHANGE_USER_SELLER_SUCCESS:
            return { loading: true, success: true };
        case CHANGE_USER_SELLER_FAIL:
            return { loading: true, error: action.payload };
        case CHANGE_USER_SELLER_RESET:
            return {};
        default:
            return state;
    }
};

export const updateStoreNameReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SELLER_NAME:
            return { success: true };
        case USER_SELLER_NAME_RESET:
            return {};
        default:
            return state;
    }
};
