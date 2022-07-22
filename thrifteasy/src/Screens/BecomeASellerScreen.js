import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, detailsUser } from "../Actions/UserActions";
import { ToastContainer } from "react-toastify";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import { UPDATE_USER_PROFILE_RESET } from "../Constants/UserConstants";

export default function BecomeASellerScreen() {
    const [storeName, setStoreName] = useState("");
    const [logo, setLogo] = useState("");
    const [description, setDescription] = useState("");
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState("");
    const [currentSellerRequest, setCurrentSellerRequest] = useState("");
    const sellerRequest = true;
    const userDetails = useSelector((state) => state.userDetails);
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const { loading, error, user } = userDetails;
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
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
            setCurrentSellerRequest(user.sellerRequest);
        }
    }, [dispatch, userData._id, user]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateUserProfile({
                userID: user._id,
                storeName,
                logo,
                description,
                sellerRequest,
            })
        );
    };
    const uploadImageHandler = async (e) => {
        const file = e.target.files[0]; // upload first selected file
        const bodyFormData = new FormData();
        bodyFormData.append("image", file);
        setLoadingUpload(true);
        try {
            const { data } = await Axios.post("/api/uploads", bodyFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userData.token}`,
                },
            });
            // let convertedData = data.replace("\\", "/"); TESTING
            setLogo(data);
            setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    };
    return (
        <div className="becomesellerscreen">
            <div>
                <h4 className="tag">Become A Seller</h4>
            </div>
            {currentSellerRequest && !userData.isSeller ? (
                <div className="allcentered">
                    <h3>You already have requested to become a seller</h3>
                </div>
            ) : userData.isSeller ? (
                <div>
                    <div className="allcentered">
                        <h3>You already have seller permissions</h3>
                    </div>
                </div>
            ) : (
                <form className="form bottom-control" onSubmit={submitHandler}>
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
                                        {loadingUpdate && (
                                            <LoadingBox></LoadingBox>
                                        )}
                                        {errorUpdate && (
                                            <BasicAlert variant="error">
                                                {errorUpdate}
                                            </BasicAlert>
                                        )}
                                        <div>
                                            <label htmlFor="storeName">
                                                Store Name
                                            </label>
                                            <input
                                                id="storeName"
                                                type="text"
                                                placeholder="Enter Store Name"
                                                value={storeName}
                                                onChange={(e) =>
                                                    setStoreName(e.target.value)
                                                }
                                            ></input>
                                        </div>
                                        <div>
                                            <label htmlFor="image">
                                                Image {logo}
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                label="Upload Image..."
                                                onChange={uploadImageHandler}
                                            ></input>
                                            {loadingUpload && (
                                                <LoadingBox></LoadingBox>
                                            )}
                                            {errorUpload && (
                                                <BasicAlert variant="error">
                                                    {errorUpload}
                                                </BasicAlert>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="description">
                                                Description
                                            </label>
                                            <input
                                                id="description"
                                                type="text"
                                                placeholder="Enter Description"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
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
                                                Apply
                                            </button>
                                        </div>
                                    </>
                                </div>
                            </div>
                        </div>
                    )}
                    <ToastContainer className="toast-position" />
                </form>
            )}
        </div>
    );
}
