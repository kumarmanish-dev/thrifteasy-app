import Axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../Actions/ProductActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import { ToastContainer } from "react-toastify";

export default function CreateProductScreen() {
    const dispatch = useDispatch();
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [productQtyInStock, setProductQtyInStock] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const productSellerID = userData._id;
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            createProduct(
                productName,
                productSellerID,
                productPrice,
                productImage,
                productCategory,
                productBrand,
                productQtyInStock,
                productDescription
            )
        );
        document.getElementById("createProductScreenForm").reset();
        setProductImage("");
    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState("");
    const uploadImageHandler = async (e) => {
        const file = e.target.files[0]; // upload first selected file
        if (file.size > 200 * 1024) {
            alert("File size should be less than 200 kb");
            document.getElementById("image").value = "";
        } else {
            const bodyFormData = new FormData();
            bodyFormData.append("image", file);
            setLoadingUpload(true);
            try {
                const { data } = await Axios.post(
                    "/api/uploads",
                    bodyFormData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${userData.token}`,
                        },
                    }
                );
                // let convertedData = data.replace("\\", "/"); TESTING
                setProductImage(data);
                setLoadingUpload(false);
            } catch (error) {
                setErrorUpload(error.message);
                setLoadingUpload(false);
            }
        }
    };
    return (
        <div>
            <form id="createProductScreenForm" className="form bottom-control" onSubmit={submitHandler}>
                <div>
                    <h4 className="tag">Add Product</h4>
                </div>
                <div className="account">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter Product Name"
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
                                    required
                                    restrictions={{
                                        maxFileSize: 10,
                                    }}
                                    onChange={uploadImageHandler}
                                ></input>
                                {loadingUpload && <LoadingBox></LoadingBox>}
                                {errorUpload && (
                                    <BasicAlert variant="error">
                                        {errorUpload}
                                    </BasicAlert>
                                )}
                            </div>
                            <div>
                                <label htmlFor="category">Category</label>
                                <input
                                    id="category"
                                    type="text"
                                    placeholder="Enter Product Category"
                                    required
                                    minLength={3}
                                    maxLength={32}
                                    onChange={(e) =>
                                        setProductCategory(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="brand">Brand</label>
                                <input
                                    id="brand"
                                    type="text"
                                    placeholder="Enter Product Brand"
                                    required
                                    minLength={3}
                                    maxLength={32}
                                    onChange={(e) =>
                                        setProductBrand(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="qtyInStock">Quantity</label>
                                <input
                                    id="qtyInStock"
                                    type="text"
                                    placeholder="Enter Product Quantity"
                                    required
                                    maxLength={7}
                                    onChange={(e) =>
                                        setProductQtyInStock(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    type="text"
                                    rows="3"
                                    placeholder="Enter Product Description"
                                    required
                                    minLength={3}
                                    maxLength={5000}
                                    onChange={(e) =>
                                        setProductDescription(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <div>
                                <label></label>
                                <button className="primary block" type="submit">
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer className="toast-position" />
            </form>
        </div>
    );
}
