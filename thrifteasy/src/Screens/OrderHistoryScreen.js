import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listPersonalOrders } from "../Actions/OrderActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";

export default function OrderHistoryScreen(props) {
    const orderPersonalList = useSelector((state) => state.orderPersonalList);
    const { loading, error, orders } = orderPersonalList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listPersonalOrders());
    }, [dispatch]);

    return (
        <div className="bottom-control">
            <h4 className="tag">Order History</h4>
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
                                                className="primary fortable"
                                                onClick={() => {
                                                    props.history.push(
                                                        `/order/${order._id}`
                                                    );
                                                }}
                                            >
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
