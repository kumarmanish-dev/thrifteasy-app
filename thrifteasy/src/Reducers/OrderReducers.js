import {
    LIST_ALL_ORDERS_FAIL,
    LIST_ALL_ORDERS_REQUEST,
    LIST_ALL_ORDERS_SUCCESS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_RESET,
    CREATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_RESET,
    DELETE_ORDER_SUCCESS,
    DELIVER_ORDER_FAIL,
    DELIVER_ORDER_REQUEST,
    DELIVER_ORDER_RESET,
    DELIVER_ORDER_SUCCESS,
    DETAILS_ORDER_FAIL,
    DETAILS_ORDER_REQUEST,
    DETAILS_ORDER_SUCCESS,
    LIST_PERSONAL_ORDERS_FAIL,
    LIST_PERSONAL_ORDERS_REQUEST,
    LIST_PERSONAL_ORDERS_SUCCESS,
    DETAILS_ADMIN_DASHBOARD_REQUEST,
    DETAILS_ADMIN_DASHBOARD_SUCCESS,
    DETAILS_ADMIN_DASHBOARD_FAIL,
    DETAILS_SELLER_DASHBOARD_REQUEST,
    DETAILS_SELLER_DASHBOARD_SUCCESS,
    DETAILS_SELLER_DASHBOARD_FAIL,
} from "../Constants/OrderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return { loading: true };
        case CREATE_ORDER_SUCCESS:
            return { loading: false, success: true, order: action.payload };
        case CREATE_ORDER_FAIL:
            return { loading: false, error: action.payload };
        case CREATE_ORDER_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDetailsReducer = (
    state = { loading: true, order: {} },
    action
) => {
    switch (action.type) {
        case DETAILS_ORDER_REQUEST:
            return { loading: true };
        case DETAILS_ORDER_SUCCESS:
            return { loading: false, order: action.payload };
        case DETAILS_ORDER_FAIL:
            return { loading: false, order: action.payload };
        default:
            return state;
    }
};

export const orderPersonalListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case LIST_PERSONAL_ORDERS_REQUEST:
            return { loading: true };
        case LIST_PERSONAL_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload };
        case LIST_PERSONAL_ORDERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderAllListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case LIST_ALL_ORDERS_REQUEST:
            return { loading: true };
        case LIST_ALL_ORDERS_SUCCESS:
            return { loading: false, orders: action.payload };
        case LIST_ALL_ORDERS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ORDER_REQUEST:
            return { loading: true };
        case DELETE_ORDER_SUCCESS:
            return { loading: true, success: true };
        case DELETE_ORDER_FAIL:
            return { loading: true, error: action.payload };
        case DELETE_ORDER_RESET:
            return {};
        default:
            return state;
    }
};

export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case DELIVER_ORDER_REQUEST:
            return { loading: true };
        case DELIVER_ORDER_SUCCESS:
            return { loading: true, success: true };
        case DELIVER_ORDER_FAIL:
            return { loading: true, error: action.payload };
        case DELIVER_ORDER_RESET:
            return {};
        default:
            return state;
    }
};

export const adminDashboardDetailsReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case DETAILS_ADMIN_DASHBOARD_REQUEST:
            return { loading: true };
        case DETAILS_ADMIN_DASHBOARD_SUCCESS:
            return { loading: false, details: action.payload };
        case DETAILS_ADMIN_DASHBOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const sellerDashboardDetailsReducer = (
    state = {},
    action
) => {
    switch (action.type) {
        case DETAILS_SELLER_DASHBOARD_REQUEST:
            return { loading: true };
        case DETAILS_SELLER_DASHBOARD_SUCCESS:
            return { loading: false, details: action.payload };
        case DETAILS_SELLER_DASHBOARD_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
