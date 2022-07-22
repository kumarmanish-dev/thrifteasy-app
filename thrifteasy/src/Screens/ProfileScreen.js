import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, detailsUser } from "../Actions/UserActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import { UPDATE_USER_PROFILE_RESET } from "../Constants/UserConstants";
import { ToastContainer } from "react-toastify";

export default function ProfileScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector(
        (state) => state.userUpdateProfile
    );
    const {
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) {
            dispatch({ type: UPDATE_USER_PROFILE_RESET });
            dispatch(detailsUser(userData._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userData._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password and confirm password are not same");
        } else {
            dispatch(
                updateUserProfile({ userID: user._id, name, email, password })
            );
        }
    };
    return (
        <div>
            <form
                className="form bottom-control"
                onSubmit={submitHandler}
            >
                <div>
                    <h4 className="tag">User Profile</h4>
                </div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <BasicAlert variant="error">{error}</BasicAlert>
                ) : (
                    <div className="account">
                        <div className="card">
                            <div className="card-body">
                                <>
                                    {" "}
                                    {loadingUpdate && <LoadingBox></LoadingBox>}
                                    {errorUpdate && (
                                        <BasicAlert variant="error">
                                            {errorUpdate}
                                        </BasicAlert>
                                    )}
                                    <div>
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="Enter Full Name"
                                            value={name}
                                            minLength={3}
                                            maxLength={32}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="email">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="text"
                                            placeholder="Enter Email Address"
                                            value={email}
                                            maxLength={70}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Enter Password"
                                            minLength={8}
                                            maxLength={16}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                            minLength={8}
                                            maxLength={16}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                        ></input>
                                    </div>
                                    <div>
                                        <label></label>
                                    </div>
                                    <div>
                                        <label></label>
                                        <button
                                            className="primary block"
                                            type="submit"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </>
                            </div>
                        </div>
                    </div>
                )}
                <ToastContainer className="toast-position" />
            </form>
        </div>
    );
}
