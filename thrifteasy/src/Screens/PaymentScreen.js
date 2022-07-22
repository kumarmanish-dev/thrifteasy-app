import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentType } from "../Actions/CartActions";

export default function PaymentScreen(props) {
    const cart = useSelector((state) => state.cart);
    const { shippingDetails } = cart;
    if (!shippingDetails.address) {
        props.history.push("/shipping");
    }
    const [paymentType, setPaymentType] = useState("Cash on Delivery");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        dispatch(savePaymentType(paymentType));
        props.history.push("/orderplacement");
        e.preventDefault();
    };
    return (
        <div>
            <form
                className="form bottom-control"
                onSubmit={submitHandler}
            >
                <div>
                    <h4 className="tag">Payment Type</h4>
                </div>
                <div className="account">
                    <div className="card">
                        <div className="card-body testing">
                            <div>
                                <div>
                                    <input
                                        className="radiobutton"
                                        type="radio"
                                        id="cod"
                                        value="Cash on Delivery"
                                        name="paymentType"
                                        required
                                        checked
                                        onChange={(e) =>
                                            setPaymentType(e.target.value)
                                        }
                                    ></input>
                                    <label htmlFor="cod">
                                        Cash on Delivery
                                    </label>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <input
                                        className="radiobutton"
                                        type="radio"
                                        id="stripe"
                                        value="Stripe"
                                        name="paymentType"
                                        required
                                        onChange={(e) =>
                                            setPaymentType(e.target.value)
                                        }
                                    ></input>
                                    <label htmlFor="stripe">Stripe</label>
                                </div>
                            </div>
                            <div>
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
