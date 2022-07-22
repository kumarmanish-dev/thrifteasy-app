import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../Actions/CartActions";

export default function CartScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch();
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };
    const incrementHandler = (item) => {
        if (item.qty < item.qtyInStock && item.qty < 5) {
            dispatch(addToCart(item.product, Number(item.qty + 1)));
        }
    };
    const decrementHandler = (item) => {
        if (item.qty > 1) {
            dispatch(addToCart(item.product, Number(item.qty - 1)));
        }
    };
    const checkOutHandler = () => {
        props.history.push("/login?redirect=shipping");
    };
    return (
        <div>
            <div className="cartscreen bottom-control">
                <div>
                    <h4 className="tag">Shopping Cart</h4>
                </div>
                {cartItems.length === 0 ? (
                    <div className="block cartempty">
                        <div>
                            <i className="fas fa-shopping-cart"></i>
                        </div>
                        <div>
                            <h3>Your cart is empty</h3>
                        </div>
                        <div>
                            <Link to="/">
                                <button className="primary">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex">
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.product}>
                                        <td>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            ></img>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/product/${item.product}`}
                                            >
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td>{item.price}</td>
                                        <td>
                                            <div className="qty">
                                                <button
                                                    className="qtyButton"
                                                    type="button"
                                                    onClick={() =>
                                                        decrementHandler(item)
                                                    }
                                                    disabled={item.qty === 1}
                                                >
                                                    -
                                                </button>
                                                <div className="qtytext">
                                                    {item.qty}
                                                </div>
                                                <button
                                                    className="qtyButton"
                                                    type="button"
                                                    onClick={() =>
                                                        incrementHandler(item)
                                                    }
                                                    disabled={
                                                        item.qty === 5 ||
                                                        item.qtyInStock ===
                                                            item.qty
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <i
                                                className="fas fa-times-circle"
                                                onClick={() =>
                                                    removeFromCartHandler(
                                                        item.product
                                                    )
                                                }
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="subtotal card">
                            <div className="card-body">
                                <h3>Order Summary</h3>
                                <div className="subtotal-details">
                                    <div className="flex">
                                        <h6>
                                            Subtotal (
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty,
                                                0
                                            )}{" "}
                                            items):
                                        </h6>
                                        <h6 className="weighted">
                                            Rs.{" "}
                                            {cartItems
                                                .reduce(
                                                    (a, c) =>
                                                        a + c.qty * c.price,
                                                    0
                                                )
                                                .toFixed(2)}
                                        </h6>
                                    </div>
                                    <div className="flex">
                                        <h6>Shipping Fee:</h6>
                                        <h6 className="weighted">
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty * c.price,
                                                0
                                            ) > 5000
                                                ? "Free"
                                                : "Rs. 350.00"}
                                        </h6>
                                    </div>
                                    {cartItems.reduce(
                                        (a, c) => a + c.qty * c.price,
                                        0
                                    ) < 5000 && (
                                        <div className="flex">
                                            <h6>Spend for FREE Shipping:</h6>
                                            <h6 className="weighted">
                                                Rs.{" "}
                                                {(
                                                    5000 -
                                                    cartItems.reduce(
                                                        (a, c) =>
                                                            a + c.qty * c.price,
                                                        0
                                                    )
                                                ).toFixed(2)}
                                            </h6>
                                        </div>
                                    )}
                                    <div className="flex">
                                        <h6>Total:</h6>
                                        <h6 className="weighted">
                                            {cartItems.reduce(
                                                (a, c) => a + c.qty * c.price,
                                                0
                                            ) > 5000
                                                ? cartItems
                                                      .reduce(
                                                          (a, c) =>
                                                              a +
                                                              c.qty * c.price,
                                                          0
                                                      )
                                                      .toFixed(2)
                                                : (
                                                      cartItems.reduce(
                                                          (a, c) =>
                                                              a +
                                                              c.qty * c.price,
                                                          0
                                                      ) + 350
                                                  ).toFixed(2)}
                                        </h6>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={checkOutHandler}
                                    className="primary block"
                                    disabled={cartItems.length === 0}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
