import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../Actions/CartActions";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

export default function Product(props) {
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const { product } = props;
    const dispatch = useDispatch();
    const addToCartHandler = (productID) => {
        if (userData) {
            if (userData.adminLevel >= 1 || userData.isSeller) {
                alert("Admins or Sellers can not purchase");
            } else {
                dispatch(addToCart(productID, 1));
            }
        } else {
            dispatch(addToCart(productID, 1));
        }
    };
    return (
        <div key={product._id} className="productCard">
            <Link to={`/product/${product._id}`}>
                <img src={product.image} alt={product.name} />
            </Link>
            <div className="productCard-body">
                <Link to={`/seller/${product.seller._id}`}>
                    <span>{product.seller.seller.name}</span>
                </Link>
                <Link to={`/product/${product._id}`}>
                    <h5>{product.name}</h5>
                </Link>
                <Rating
                    rating={product.rating}
                    numOfReviews={product.numOfReviews}
                ></Rating>
                <div className="pricencart">
                    <h4>Rs. {product.price}</h4>
                    <i
                        className="fas fa-shopping-cart cart"
                        onClick={() => addToCartHandler(product._id)}
                    ></i>
                </div>
            </div>
            <ToastContainer className="toast-position"/>
        </div>
    );
}
