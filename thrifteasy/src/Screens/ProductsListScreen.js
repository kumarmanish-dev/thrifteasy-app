import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, listProducts } from "../Actions/ProductActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import { DELETE_PRODUCT_RESET } from "../Constants/ProductConstants";
import { ToastContainer } from "react-toastify";

export default function ProductsListScreen(props) {
    const sellerProducts = props.match.path.indexOf("/seller") >= 0;
    const productsList = useSelector((state) => state.productsList);
    const { loading, error, products } = productsList;
    const dispatch = useDispatch();
    const productDelete = useSelector((state) => state.productDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete;
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    useEffect(() => {
        dispatch({ type: DELETE_PRODUCT_RESET });
        dispatch(
            listProducts({ sellerID: sellerProducts ? userData._id : "" })
        );
    }, [dispatch, successDelete, sellerProducts, userData._id]);
    const deleteHandler = (product) => {
        if (window.confirm("Do you really want to delete this product?"))
            dispatch(deleteProduct(product._id));
    };
    return (
        <div className="bottom-control">
            <div>
                <h4 className="tag">Products</h4>
                {userData.isSeller && (
                    <Link to="/addproduct" className="flex-end">
                        <button className="primary bottom-control">
                            Add Product
                        </button>
                    </Link>
                )}
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && (
                <BasicAlert variant={error}>{errorDelete}</BasicAlert>
            )}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <BasicAlert variant="error">{error}</BasicAlert>
            ) : (
                <div>
                    {products.length === 0 ? (
                        <div className="allcentered">
                            <h3>You do not have any products</h3>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="primary fortable2"
                                                onClick={() =>
                                                    props.history.push(
                                                        `/products/${product._id}/edit`
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="primary fortable2"
                                                onClick={() =>
                                                    deleteHandler(product)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            <ToastContainer className="toast-position" />
        </div>
    );
}
