import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function SellerRoute({ component: Component, ...rest }) {
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    return (
        <Route
            {...rest}
            render={(props) =>
                userData && userData.isSeller ? (
                    <Component {...props}></Component>
                ) : (
                    <Redirect to="/login"></Redirect>
                )
            }
        ></Route>
    );
}
