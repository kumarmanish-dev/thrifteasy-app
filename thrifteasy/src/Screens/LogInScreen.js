import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../Actions/UserActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";

export default function LogInScreen(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";

    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData, loading, error } = userLogIn;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(logIn(email, password));
    };
    useEffect(() => {
        if (userData) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userData]);
    return (
        <div>
            <form
                className="form bottom-control"
                onSubmit={submitHandler}
            >
                <div>
                    <h4 className="tag">Log In</h4>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <BasicAlert variant="error">{error}</BasicAlert>}
                <div className="account">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <label htmlFor="email">Email Address *</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter Email Address"
                                    required
                                    maxLength={70}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="password">Password *</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    required
                                    // minLength={8}
                                    maxLength={16}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label></label>
                                <div>
                                    New Customer?{" "}
                                    <Link to={`/register?redirect=${redirect}`}>
                                        Create new account
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <label></label>
                                <button className="primary block" type="submit">
                                    Log In
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
