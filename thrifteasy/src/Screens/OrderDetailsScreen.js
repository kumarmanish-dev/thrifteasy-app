import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BasicAlert from "../Components/BasicAlert";
import LoadingBox from "../Components/LoadingBox";
import { detailsOrder } from "../Actions/OrderActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function OrderDetailsScreen(props) {
    const orderID = props.match.params.id;
    var newOrder = props.location.search
        ? props.location.search.split("=")[1]
        : "/";
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailsOrder(orderID));
    }, [dispatch, orderID]);
    if (newOrder === "newOrder") {
        toast.success("Order successfully placed", {
            toastId: "success1",
        });
        newOrder = "notNewOrder";
    }

    return loading ? (
        <LoadingBox></LoadingBox>
    ) : error ? (
        <BasicAlert></BasicAlert>
    ) : (
        <div className="orderplacementscreen bottom-control">
            <div className="bottom-control">
                <h4 className="tag">Order Details</h4>
                <div className="text-centered">
                    <h2 className="green">
                        <i className="fas fa-clock"></i> Thank you for your
                        purchase!
                    </h2>
                    <h6>Your order number is: {order._id}</h6>
                    <h6>Delivery dates: Estimate 1-3 working days.</h6>
                    <h6>Please have the amount ready on delivery day: </h6>
                    <h3 className="green">
                        Rs.{" "}
                        {order.orderedItems.reduce(
                            (a, c) => a + c.qty * c.price,
                            0
                        ) > 5000
                            ? order.orderedItems
                                  .reduce((a, c) => a + c.qty * c.price, 0)
                                  .toFixed(2)
                            : (
                                  order.orderedItems.reduce(
                                      (a, c) => a + c.qty * c.price,
                                      0
                                  ) + 350
                              ).toFixed(2)}
                    </h3>
                </div>
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
                        {order.orderedItems.map((item) => (
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
                                    {order.shippingDetails.fullName}
                                </h6>
                            </div>
                            <div className="flex notjustified">
                                <h6>Contact Number: </h6>
                                <h6 className="weighted">
                                    {order.shippingDetails.contactNumber}
                                </h6>
                            </div>
                            <div className="flex notjustified">
                                <h6>Address: </h6>
                                <h6 className="weighted">
                                    {order.shippingDetails.address},{" "}
                                    {order.shippingDetails.city},{" "}
                                    {order.shippingDetails.postalCode}
                                </h6>
                            </div>
                            {order.delivered ? (
                                <div className="flex notjustified">
                                    <h6>Status: </h6>
                                    <h6 className="weighted success">
                                        Delivered (
                                        {order.delivered.substring(0, 10)})
                                    </h6>
                                </div>
                            ) : (
                                <div className="flex notjustified">
                                    <h6>Status: </h6>
                                    <h6 className="weighted fail">
                                        Not Delivered
                                    </h6>
                                </div>
                            )}
                            <div className="flex notjustified">
                                <h6>Payment Type: </h6>
                                <h6 className="weighted">
                                    {order.paymentType}
                                </h6>
                            </div>
                            {order.paid ? (
                                <div className="flex notjustified">
                                    <h6>Status: </h6>
                                    <h6 className="weighted success">
                                        Paid ({order.paid.substring(0, 10)})
                                    </h6>
                                </div>
                            ) : (
                                <div className="flex notjustified">
                                    <h6>Status: </h6>
                                    <h6 className="weighted fail">Unpaid</h6>
                                </div>
                            )}
                        </div>
                        <h3>Order Summary</h3>
                        <div className="subtotal-details">
                            <div className="flex">
                                <h6>
                                    Subtotal (
                                    {order.orderedItems.reduce(
                                        (a, c) => a + c.qty,
                                        0
                                    )}{" "}
                                    items):
                                </h6>
                                <h6 className="weighted">
                                    Rs.{" "}
                                    {order.orderedItems
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
                                    {order.orderedItems.reduce(
                                        (a, c) => a + c.qty * c.price,
                                        0
                                    ) > 5000
                                        ? "Free"
                                        : "Rs. 350.00"}
                                </h6>
                            </div>
                            <div className="flex">
                                <h6>Total:</h6>
                                <h6 className="weighted">
                                    {order.orderedItems.reduce(
                                        (a, c) => a + c.qty * c.price,
                                        0
                                    ) > 5000
                                        ? order.orderedItems
                                              .reduce(
                                                  (a, c) => a + c.qty * c.price,
                                                  0
                                              )
                                              .toFixed(2)
                                        : (
                                              order.orderedItems.reduce(
                                                  (a, c) => a + c.qty * c.price,
                                                  0
                                              ) + 350
                                          ).toFixed(2)}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer className="toast-position" />
        </div>
    );
}
