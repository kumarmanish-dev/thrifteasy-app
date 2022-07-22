import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, changeUserSeller, changeUserSellerRequest } from "../Actions/UserActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import { CHANGE_USER_SELLER_RESET } from "../Constants/UserConstants";
import { ToastContainer } from "react-toastify";

export default function SellerRequestsList() {
    const usersList = useSelector((state) => state.usersList);
    const { loading, error, users } = usersList;
    const dispatch = useDispatch();
    const userChangeSeller = useSelector((state) => state.userChangeSeller);
    const { success: successSeller } = userChangeSeller;
    useEffect(() => {
        dispatch({ type: CHANGE_USER_SELLER_RESET });
        dispatch(listUsers({ sellerRequest: true }));
    }, [dispatch, successSeller]);
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const sellerHandler = (user) => {
        if (window.confirm("Are you sure about your action?")) {
            dispatch(changeUserSeller(user));
        }
    };
    const sellerRequestHandler = (user) => {
        if (window.confirm("Are you sure about your action?")) {
            dispatch(changeUserSellerRequest(user));
        }
    };
    return (
        <div className="userslistscreen content-start bottom-control">
            <div>
                <h4 className="tag">Seller Requests</h4>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <BasicAlert variant="error">{error}</BasicAlert>
            ) : (
                <div>
                    {users.length === 0 ? (
                        <div className="allcentered">
                            <h3>No become seller requests</h3>
                        </div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        {userData._id === user._id ? (
                                            <td>
                                                You can not apply actions on
                                                yourself
                                            </td>
                                        ) : (
                                            <td>
                                                <button
                                                    type="button"
                                                    className="primary fortable2"
                                                    onClick={() =>
                                                        sellerHandler(user)
                                                    }
                                                >
                                                    {user.isSeller
                                                        ? "Remove Seller"
                                                        : "Make Seller"}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="primary fortable2"
                                                    onClick={() =>
                                                        sellerRequestHandler(
                                                            user
                                                        )
                                                    }
                                                >
                                                    {user.sellerRequest
                                                        ? "Remove Request"
                                                        : "Make Seller"}
                                                </button>
                                            </td>
                                        )}
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
