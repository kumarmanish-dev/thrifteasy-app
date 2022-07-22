import Axios from "axios";
import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    LIST_PRODUCTS_FAIL,
    LIST_PRODUCTS_REQUEST,
    LIST_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from "../Constants/ProductConstants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const listProducts =
    ({ sellerID = "", prdName = "" }) =>
    async (dispatch) => {
        dispatch({
            type: LIST_PRODUCTS_REQUEST,
        });
        try {
            const { data } = await Axios.get(`/api/products?sellerID=${sellerID}&productName=${prdName}`);
            dispatch({ type: LIST_PRODUCTS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: LIST_PRODUCTS_FAIL, payload: error.message });
        }
    };

export const detailsProduct = (productID) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productID });
    try {
        const { data } = await Axios.get(`/api/products/${productID}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const createProduct =
    (
        productName,
        productSellerID,
        productPrice,
        productImage,
        productCategory,
        productBrand,
        productQtyInStock,
        productDescription
    ) =>
    async (dispatch, getState) => {
        dispatch({
            type: CREATE_PRODUCT_REQUEST,
            payload: {
                productName,
                productSellerID,
                productPrice,
                productImage,
                productCategory,
                productBrand,
                productQtyInStock,
                productDescription,
            },
        });
        const {
            userLogIn: { userData },
        } = getState();
        try {
            const { data } = await Axios.post(
                "/api/products/addproduct",
                {
                    productName,
                    productSellerID,
                    productPrice,
                    productImage,
                    productCategory,
                    productBrand,
                    productQtyInStock,
                    productDescription,
                },
                {
                    headers: { Authorization: `Bearer ${userData.token}` },
                }
            );
            dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.product }); // data.product = data.product from ProductRouter
            toast.success("Product successfully added");
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({ type: CREATE_PRODUCT_FAIL, payload: message });
            toast.error("Could not add product");
        }
    };

export const updateProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: UPDATE_PRODUCT_REQUEST, payload: product });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        const { data } = await Axios.put(
            `/api/products/${product._id}`,
            product,
            {
                headers: { Authorization: `Bearer ${userData.token}` },
            }
        );
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data });
        toast.success("Product successfully updated");
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: UPDATE_PRODUCT_FAIL, error: message });
        toast.error("Could not update product");
    }
};

export const deleteProduct = (productID) => async (dispatch, getState) => {
    dispatch({ type: DELETE_PRODUCT_REQUEST, payload: productID });
    const {
        userLogIn: { userData },
    } = getState();
    try {
        Axios.delete(`/api/products/${productID}`, {
            headers: { Authorization: `Bearer ${userData.token}` },
        });
        dispatch({ type: DELETE_PRODUCT_SUCCESS });
        toast.warning("Product successfully deleted");
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: message });
        toast.error("Could not delete product");
    }
};
