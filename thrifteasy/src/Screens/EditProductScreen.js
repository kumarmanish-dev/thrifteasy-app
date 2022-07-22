import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../Actions/ProductActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import { UPDATE_PRODUCT_RESET } from "../Constants/ProductConstants";
import { ToastContainer } from "react-toastify";

export default function EditProductScreen(props) {
    const productID = props.match.params.id;
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productQtyInStock, setProductQtyInStock] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = productUpdate;
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    useEffect(() => {
        if (successUpdate) {
            if (userData.adminLevel >= 1) {
                props.history.push("/productslist");
            } else {
                props.history.push("/productslist/seller");
            }
        }
        if (!product || product._id !== productID || successUpdate) {
            dispatch({ type: UPDATE_PRODUCT_RESET });
            dispatch(detailsProduct(productID));
        } else {
            setProductName(product.name);
            setProductPrice(product.price);
            setProductImage(product.image);
            setProductCategory(product.category);
            setProductBrand(product.brand);
            setProductQtyInStock(product.qtyInStock);
            setProductDescription(product.description);
        }
    }, [
        product,
        dispatch,
        productID,
        successUpdate,
        props.history,
        userData.adminLevel,
    ]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productID,
                productName,
                productPrice,
                productImage,
                productCategory,
                productBrand,
                productQtyInStock,
                productDescription,
            })
        );
    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState("");
    const uploadImageHandler = async (e) => {
        const file = e.target.files[0]; // upload first selected file
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post("/api/uploads", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            // let convertedData = data.replace("\\", "/"); TESTING
            setProductImage(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    return (
        <div>
            <form
                className="form bottom-control"
                onSubmit={submitHandler}
            >
                <div>
                    <h4 className="tag">Edit Product</h4>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (
                    <BasicAlert variant="error">{errorUpdate}</BasicAlert>
                )}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <BasicAlert variant="error">{error}</BasicAlert>
                ) : (
                    <div className="account">
                        <div className="card">
                            <div className="card-body">
                                <>
                                    <div>
                                        <label htmlFor="id">ID</label>
                                        <input
                                            id="id"
                                            type="text"
                                            value={productID}
                                            disabled
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter Product Name"
                                            value={productName}
                                            required
                                            minLength={3}
                                            maxLength={32}
                                            onChange={(e) =>
                                                setProductName(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="price">Price</label>
                                        <input
                                            id="price"
                                            type="text"
                                            placeholder="Enter Product Price"
                                            value={productPrice}
                                            required
                                            maxLength={7}
                                            onChange={(e) =>
                                                setProductPrice(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="image">
                                            Image {productImage}
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            label="Upload Image..."
                                            onChange={uploadImageHandler}
                                        ></input>
                                        {loadingUpload && (
                                            <LoadingBox></LoadingBox>
                                        )}
                                        {errorUpload && (
                                            <BasicAlert variant="error">
                                                {errorUpload}
                                            </BasicAlert>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="category">
                                            Category
                                        </label>
                                        <input
                                            id="category"
                                            type="text"
                                            placeholder="Enter Product Category"
                                            value={productCategory}
                                            required
                                            minLength={3}
                                            maxLength={32}
                                            onChange={(e) =>
                                                setProductCategory(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="brand">Brand</label>
                                        <input
                                            id="brand"
                                            type="text"
                                            placeholder="Enter Product Brand"
                                            value={productBrand}
                                            required
                                            minLength={3}
                                            maxLength={32}
                                            onChange={(e) =>
                                                setProductBrand(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="qtyInStock">
                                            Quantity
                                        </label>
                                        <input
                                            id="qtyInStock"
                                            type="text"
                                            placeholder="Enter Product Quantity"
                                            value={productQtyInStock}
                                            required
                                            maxLength={7}
                                            onChange={(e) =>
                                                setProductQtyInStock(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            type="text"
                                            rows="3"
                                            placeholder="Enter Product Description"
                                            value={productDescription}
                                            required
                                            minLength={3}
                                            maxLength={5000}
                                            onChange={(e) =>
                                                setProductDescription(
                                                    e.target.value
                                                )
                                            }
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label></label>
                                        <button
                                            className="primary block"
                                            type="submit"
                                        >
                                            Update Product
                                        </button>
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer className="toast-position" />
            </form>
        </div>
    );
}
