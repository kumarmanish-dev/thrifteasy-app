import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../Actions/UserActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";

export default function RegisterScreen(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const redirect = props.location.search
        ? props.location.search.split("=")[1]
        : "/";
    const userRegister = useSelector((state) => state.userRegister);
    const { userData, loading, error } = userRegister;
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData: logInUserData } = userLogIn;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password does not match");
        } else {
            dispatch(register(name, email, password));
        }
    };
    useEffect(() => {
        if (userData || logInUserData) {
            props.history.push(redirect);
        }
    }, [props.history, redirect, userData, logInUserData]);
    return (
        <div>
            <form
                className="form bottom-control"
                onSubmit={submitHandler}
            >
                <div>
                    <h4 className="tag">Register</h4>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <BasicAlert variant="error">{error}</BasicAlert>}
                <div className="account">
                    <div className="card">
                        <div className="card-body">
                            <div>
                                <label htmlFor="name">Full Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter Full Name"
                                    required
                                    maxLength={32}
                                    onChange={(e) => setName(e.target.value)}
                                ></input>
                            </div>
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
                                    minLength={8}
                                    maxLength={16}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">
                                    Confirm Password *
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    required
                                    minLength={8}
                                    maxLength={16}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                ></input>
                            </div>
                            <div>
                                <label></label>
                                <div>
                                    Already have an account?{" "}
                                    <Link to={`/login?redirect=${redirect}`}>
                                        Log In
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <label></label>
                                <button className="primary block" type="submit">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
