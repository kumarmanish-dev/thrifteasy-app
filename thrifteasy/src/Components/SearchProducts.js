import React, { useState } from "react";

export default function SearchProducts(props) {
    const [name, setName] = useState("");
    const submitHandler = (e) => {
        e.preventDefault();
        document.getElementById('productSearchBox').value = "";
        props.history.push(`/search/name/${name}`);
    };

    return (
        <form className="search" onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Search your favoruite products..."
                name="productSearchBox"
                id="productSearchBox"
                onChange={(e) => setName(e.target.value)}
            ></input>
            <button className="primary" type="submit">
                <i className="fa fa-search"></i>
            </button>
        </form>
    );
}
