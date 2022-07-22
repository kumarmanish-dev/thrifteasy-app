import React from "react";

export default function BasicAlert(props) {
    return (
        <div className={`basicalert basicalert-${props.variant || "normal"}`}>
            {props.children}
        </div>
    );
}
