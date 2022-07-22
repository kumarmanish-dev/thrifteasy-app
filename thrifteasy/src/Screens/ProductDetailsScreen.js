import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../Actions/CartActions";
import { detailsProduct, listProducts } from "../Actions/ProductActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import Product from "../Components/Product";

import Rating from "../Components/Rating";

export default function ProductDetailsScreen(props) {
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const productDetails = useSelector((state) => state.productDetails);
    const { loading, error, product } = productDetails;
    const dispatch = useDispatch();
    const productID = props.match.params.id;
    const [qty, setQty] = useState(1);
    const incrementHandler = () => {
        if (qty < product.qtyInStock && qty < 5) {
            setQty(qty + 1);
        }
    };
    const decrementHandler = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };
    useEffect(() => {
        dispatch(detailsProduct(productID));
    }, [dispatch, productID]);
    const addToCartHandler = () => {
        if (userData) {
            if (userData.adminLevel >= 1 || userData.isSeller) {
                alert("Admins or Sellers can not purchase");
            } else {
                dispatch(addToCart(productID, qty));
            }
        } else {
            dispatch(addToCart(productID, qty));
        }
    };
    const productsList = useSelector((state) => state.productsList);
    const {
        loading: loadingProducts,
        error: errorProducts,
        products,
    } = productsList;
    useEffect(() => {
        dispatch(listProducts({}));
    }, [dispatch]);
    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <BasicAlert variant="error">{error}</BasicAlert>
            ) : (
                <div className="product-details">
                    <h4 className="tag">Product Details</h4>
                    <h6>
                        <Link to="/">Home</Link> {">"}{" "}
                        <Link to="/">{product.category}</Link> {">"}{" "}
                        {product.brand}
                    </h6>
                    <div className="product-subdetails">
                        <div className="img-container">
                            <img src={product.image} alt={product.name}></img>
                        </div>
                        <div className="details-container">
                            <Link to={`/seller/${product.seller._id}`}>
                                <span>{product.seller.seller.name}</span>
                            </Link>
                            <h1>{product.name}</h1>
                            <h4>Rs. {product.price}</h4>
                            {product.qtyInStock > 0 ? (
                                <>
                                    <div className="status">
                                        <div className="qty">
                                            <button
                                                className="qtyButton"
                                                type="button"
                                                onClick={decrementHandler}
                                                disabled={qty === 1}
                                            >
                                                -
                                            </button>
                                            <h2>{qty}</h2>
                                            <button
                                                className="qtyButton"
                                                type="button"
                                                onClick={incrementHandler}
                                                disabled={
                                                    qty === 5 ||
                                                    product.qtyInStock === qty
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                        <div className="cartButton">
                                            <button onClick={addToCartHandler}>
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <span id="outofstock">Out of stock</span>
                            )}
                            <Rating
                                rating={product.rating}
                                numOfReviews={product.numOfReviews}
                            ></Rating>
                            <h5>
                                Description{" "}
                                <i className="fas fa-info-circle green"></i>
                            </h5>
                            <span id="description">{product.description}</span>
                        </div>
                    </div>
                    <h4 className="tag">Trending Now</h4>
                    <div className="products margin-control">
                        {loadingProducts ? (
                            <LoadingBox></LoadingBox>
                        ) : errorProducts ? (
                            <BasicAlert variant="error">
                                {errorProducts}
                            </BasicAlert>
                        ) : (
                            <div className="products-container">
                                {products.slice(0, 5).map((product) => (
                                    <Product
                                        key={product._id}
                                        product={product}
                                    ></Product>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
