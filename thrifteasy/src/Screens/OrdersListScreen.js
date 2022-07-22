import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteOrder,
    deliverOrder,
    listAllOrders,
} from "../Actions/OrderActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import {
    DELETE_ORDER_RESET,
    DELIVER_ORDER_RESET,
} from "../Constants/OrderConstants";
import { ToastContainer } from "react-toastify";

export default function OrdersListScreen(props) {
    const sellerOrders = props.match.path.indexOf("/seller") >= 0;
    const dispatch = useDispatch();
    const orderAllList = useSelector((state) => state.orderAllList);
    const { loading, error, orders } = orderAllList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { success: successDeliver } = orderDeliver;
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    useEffect(() => {
        dispatch({ type: DELETE_ORDER_RESET });
        dispatch({ type: DELIVER_ORDER_RESET });
        dispatch(listAllOrders({ sellerID: sellerOrders ? userData._id : "" }));
    }, [dispatch, successDelete, successDeliver, userData._id, sellerOrders]);
    const deleteHandler = (order) => {
        if (window.confirm("Do you really want to delete this order?"));
        dispatch(deleteOrder(order._id));
    };
    const deliverHandler = (order) => {
        dispatch(deliverOrder(order._id));
    };
    return (
        <div className="orderslisttable bottom-control">
            <h4 className="tag">Orders</h4>
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
                    {orders.length === 0 ? (
                        <div className="allcentered">
                            <h3>You do not have any orders</h3>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th>Delivered</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user.name}</td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>{order.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {order.paid
                                                ? order.paid.substring(0, 10)
                                                : "Unpaid"}
                                        </td>
                                        <td>
                                            {order.delivered
                                                ? order.delivered.substring(
                                                      0,
                                                      10
                                                  )
                                                : "Not Delivered"}
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="primary fortable2"
                                                onClick={() => {
                                                    props.history.push(
                                                        `/order/${order._id}`
                                                    );
                                                }}
                                            >
                                                Details
                                            </button>
                                            <button
                                                type="button"
                                                className="primary fortable2"
                                                onClick={() => {
                                                    deleteHandler(order);
                                                }}
                                            >
                                                Delete
                                            </button>
                                            {!order.delivered && (
                                                <button
                                                    type="button"
                                                    className="primary fortable2"
                                                    onClick={() => {
                                                        deliverHandler(order);
                                                    }}
                                                >
                                                    Deliver
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
            <div></div>
            <ToastContainer className="toast-position" />
        </div>
    );
}
