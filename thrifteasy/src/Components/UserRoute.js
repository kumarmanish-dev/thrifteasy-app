import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function UserRoute({ component: Component, ...rest }) {
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    return (
        <Route
            {...rest}
            render={(props) =>
                userData ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/login"></Redirect>
                )
            }
        ></Route>
    );
}
