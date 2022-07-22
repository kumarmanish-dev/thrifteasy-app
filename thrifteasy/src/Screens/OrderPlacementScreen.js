import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder, createStripeOrder } from "../Actions/OrderActions";
import BasicAlert from "../Components/BasicAlert";
import LoadingBox from "../Components/LoadingBox";
import { CREATE_ORDER_RESET } from "../Constants/OrderConstants";
import StripeCheckout from "react-stripe-checkout";

export default function OrderPlacementScreen(props) {
    const cart = useSelector((state) => state.cart);
    if (!cart.paymentType) {
        props.history.push("/payment");
    }
    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;
    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 5000 ? toPrice(0) : toPrice(350);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderedItems: cart.cartItems }));
    };
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const stripePayoutHandler = (token) => {
        console.log("reached here");
        dispatch(
            createStripeOrder({ ...cart, orderedItems: cart.cartItems, token })
        );
    };
    const renderCheckout = () => {
        if (cart.cartItems.length > 0) {
            return (
                <StripeCheckout
                    name="Payment"
                    email={userData.email}
                    amount={cart.totalPrice}
                    token={(token) => stripePayoutHandler(token)}
                    stripeKey="pk_test_51L9FP8JZydxOk315CgSiyGNiqArSRhudyjiCgDsyx8m7c0D5nUbUSeuQyNwZswKXAiQenNIiKc0qZi6cZGbpqxlz00x1QhUffV"
                >
                    <button
                        className="primary block"
                        disabled={cart.cartItems.length === 0}
                    >
                        Place Order
                    </button>
                </StripeCheckout>
            );
        }
    };
    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}?=newOrder`);
            dispatch({ type: CREATE_ORDER_RESET });
        }
    }, [dispatch, order, props.history, success]);

    return (
        <div className="orderplacementscreen bottom-control">
            <div>
                <h4 className="tag">Order Placement</h4>
            </div>
            <div className="flex">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.cartItems.map((item) => (
                            <tr key={item.product}>
                                <td>
                                    <img src={item.image} alt={item.name}></img>
                                </td>
                                <td>
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                </td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="subtotal card">
                    <div className="card-body">
                        <h3>Shipping & Billing</h3>
                        <div className="subtotal-details">
                            <div className="flex notjustified">
                                <h6>Full Name: </h6>
                                <h6 className="weighted">
                                    {cart.shippingDetails.fullName}
                                </h6>
                            </div>
                            <div className="flex notjustified">
                                <h6>Contact Number: </h6>
                                <h6 className="weighted">
                                    {cart.shippingDetails.contactNumber}
                                </h6>
                            </div>
                            <div className="flex notjustified">
                                <h6>Address: </h6>
                                <h6 className="weighted">
                                    {cart.shippingDetails.address},{" "}
                                    {cart.shippingDetails.city},{" "}
                                    {cart.shippingDetails.postalCode}
                                </h6>
                            </div>
                            <div className="flex notjustified">
                                <h6>Payment Type: </h6>
                                <h6 className="weighted">{cart.paymentType}</h6>
                            </div>
                        </div>
                        <h3>Order Summary</h3>
                        <div className="subtotal-details">
                            <div className="flex">
                                <h6>
                                    Subtotal (
                                    {cart.cartItems.reduce(
                                        (a, c) => a + c.qty,
                                        0
                                    )}{" "}
                                    items):
                                </h6>
                                <h6 className="weighted">
                                    Rs.{" "}
                                    {cart.cartItems
                                        .reduce(
                                            (a, c) => a + c.qty * c.price,
                                            0
                                        )
                                        .toFixed(2)}
                                </h6>
                            </div>
                            <div className="flex">
                                <h6>Shipping Fee:</h6>
                                <h6 className="weighted">
                                    {cart.cartItems.reduce(
                                        (a, c) => a + c.qty * c.price,
                                        0
                                    ) > 5000
                                        ? "Free"
                                        : "Rs. 350.00"}
                                </h6>
                            </div>
                            {cart.cartItems.reduce(
                                (a, c) => a + c.qty * c.price,
                                0
                            ) < 5000 && (
                                <div className="flex">
                                    <h6>Spend for FREE Shipping:</h6>
                                    <h6 className="weighted">
                                        Rs.{" "}
                                        {(
                                            5000 -
                                            cart.cartItems.reduce(
                                                (a, c) => a + c.qty * c.price,
                                                0
                                            )
                                        ).toFixed(2)}
                                    </h6>
                                </div>
                            )}
                            <div className="flex">
                                <h6>Total:</h6>
                                <h6 className="weighted">
                                    {cart.cartItems.reduce(
                                        (a, c) => a + c.qty * c.price,
                                        0
                                    ) > 5000
                                        ? cart.cartItems
                                              .reduce(
                                                  (a, c) => a + c.qty * c.price,
                                                  0
                                              )
                                              .toFixed(2)
                                        : (
                                              cart.cartItems.reduce(
                                                  (a, c) => a + c.qty * c.price,
                                                  0
                                              ) + 350
                                          ).toFixed(2)}
                                </h6>
                            </div>
                        </div>
                        {cart.paymentType === "Cash on Delivery" ? (
                            <button
                                type="button"
                                onClick={placeOrderHandler}
                                className="primary block"
                                disabled={cart.cartItems.length === 0}
                            >
                                Place Order
                            </button>
                        ) : (
                            <div>
                                {renderCheckout()}
                                {loading && <LoadingBox></LoadingBox>}
                                {error && (
                                    <BasicAlert variant="error">
                                        {error}
                                    </BasicAlert>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
