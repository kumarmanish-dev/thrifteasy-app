import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingDetails } from "../Actions/CartActions";

export default function ShippingScreen(props) {
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const cart = useSelector((state) => state.cart);
    const { shippingDetails } = cart;
    if (!userData) {
        props.history.push("/login");
    }
    const [fullName, setFullName] = useState(shippingDetails.fullName);
    const [contactNumber, setContactNumber] = useState(
        shippingDetails.contactNumber
    );
    const [address, setAddress] = useState(shippingDetails.address);
    const [city, setCity] = useState(shippingDetails.city);
    const [postalCode, setPostalCode] = useState(shippingDetails.postalCode);
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingDetails({
                fullName,
                contactNumber,
                address,
                city,
                postalCode,
            })
        );
        props.history.push("/payment");
    };
    return (
        <div>
            <form
                className="form bottom-control"
                onSubmit={submitHandler}
            >
                <div>
                    <h4 className="tag">Shipping Details</h4>
                </div>
                <div className="account">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <label htmlFor="fullName">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    placeholder="Enter Full Name"
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                    required
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="contactNumber">
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    id="contactNumber"
                                    placeholder="Enter Contact Number"
                                    value={contactNumber}
                                    onChange={(e) =>
                                        setContactNumber(e.target.value)
                                    }
                                    required
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Enter Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="city">City</label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Enter City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="postalCode">Postal Code</label>
                                <input
                                    type="text"
                                    id="postalCode"
                                    placeholder="Enter Postal Code"
                                    value={postalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                    required
                                ></input>
                            </div>
                            <div>
                                <label></label>
                                <button className="primary block" type="submit">
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
