import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listProducts } from "../Actions/ProductActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import Product from "../Components/Product";

export default function SearchProductsScreen() {
    const { name = "all" } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts({ prdName: name !== "all" ? name : "" }));
    }, [dispatch, name]);
    const productsList = useSelector((state) => state.productsList);
    const { loading, error, products } = productsList;
    const [productsLimit, setProductsLimit] = useState(60);
    const loadMoreHandler = () => {
        setProductsLimit(productsLimit + 20);
    };
    return (
        <div>
            <div>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <BasicAlert>{error}</BasicAlert>
                ) : (
                    <div className="products productsHome margin-control bottom-control">
                        {loading ? (
                            <LoadingBox></LoadingBox>
                        ) : error ? (
                            <BasicAlert variant="error">{error}</BasicAlert>
                        ) : (
                            <div>
                                <div className="products-container">
                                    <h4 className="tag">
                                        {products.length} Results
                                    </h4>
                                    {products
                                        .slice(0, productsLimit)
                                        .map((product) => (
                                            <Product
                                                key={product._id}
                                                product={product}
                                            ></Product>
                                        ))}
                                </div>
                                {products.length > productsLimit && (
                                    <button
                                        className="primary margin-control"
                                        onClick={loadMoreHandler}
                                    >
                                        Load More
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
