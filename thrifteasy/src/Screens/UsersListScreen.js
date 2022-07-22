import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    listUsers,
    changeUserSeller,
    changeUserAdmin,
} from "../Actions/UserActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import {
    CHANGE_USER_ADMIN_RESET,
    CHANGE_USER_SELLER_RESET,
} from "../Constants/UserConstants";
import { ToastContainer } from "react-toastify";

export default function UsersListScreen() {
    const usersList = useSelector((state) => state.usersList);
    const { loading, error, users } = usersList;
    const dispatch = useDispatch();
    const userChangeAdmin = useSelector((state) => state.userChangeAdmin);
    const { success: successAdmin } = userChangeAdmin;
    const userChangeSeller = useSelector((state) => state.userChangeSeller);
    const { success: successSeller } = userChangeSeller;
    useEffect(() => {
        dispatch({ type: CHANGE_USER_ADMIN_RESET });
        dispatch({ type: CHANGE_USER_SELLER_RESET });
        dispatch(listUsers({}));
    }, [dispatch, successAdmin, successSeller]);
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const sellerHandler = (user) => {
        if (window.confirm("Are you sure about your action?"))
        {
            dispatch(changeUserSeller(user));
        }
    };
    const adminHandler = (user) => {
        if (window.confirm("Are you sure about your action?"))
        {
            dispatch(changeUserAdmin(user));
        }
    };
    const customerOnlyHandler = () => {
        dispatch(listUsers({ adminLevel: 0, isSeller: 0 }));
    };
    const sellerOnlyHandler = () => {
        dispatch(listUsers({ isSeller: 1 }));
    };
    const adminOnlyHandler = () => {
        dispatch(listUsers({ adminLevel: 1 }));
    };
    const allHandler = () => {
        dispatch(listUsers({}));
    };
    return (
        <div className="userslistscreen content-start bottom-control">
            <div>
                <h4 className="tag">Users</h4>
            </div>
            <div className="userslistbuttons">
                <button
                    className="primary"
                    onClick={() => customerOnlyHandler()}
                >
                    Customers
                </button>
                <button className="primary" onClick={() => sellerOnlyHandler()}>
                    Sellers
                </button>
                <button className="primary" onClick={() => adminOnlyHandler()}>
                    Admins
                </button>
                <button className="primary" onClick={() => allHandler()}>
                    All
                </button>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <BasicAlert variant="error">{error}</BasicAlert>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Seller</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isSeller ? "Yes" : "No"}</td>
                                <td>{user.adminLevel >= 1 ? "Yes" : "No"}</td>
                                {userData._id === user._id ? (
                                    <td>
                                        You can not apply actions on yourself
                                    </td>
                                ) : (
                                    <td>
                                        <button
                                            type="button"
                                            className="primary fortable2"
                                            onClick={() => sellerHandler(user)}
                                        >
                                            {user.isSeller
                                                ? "Remove Seller"
                                                : "Make Seller"}
                                        </button>
                                        <button
                                            type="button"
                                            className="primary fortable2"
                                            onClick={() => adminHandler(user)}
                                        >
                                            {user.adminLevel >= 1
                                                ? "Remove Admin"
                                                : "Make Admin"}
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ToastContainer className="toast-position" />
        </div>
    );
}
