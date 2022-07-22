import React, { useEffect, useState } from "react";

import Product from "../Components/Product";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/ProductActions";
import Carousel from "react-bootstrap/Carousel";

export default function HomeScreen() {
    const dispatch = useDispatch();
    const productsList = useSelector((state) => state.productsList);
    const { loading, error, products } = productsList;
    const [productsLimit, setProductsLimit] = useState(60);
    const loadMoreHandler = () => {
        setProductsLimit(productsLimit + 20);
    };
    useEffect(() => {
        dispatch(listProducts({}));
    }, [dispatch]);
    return (
        <div>
            <div>
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src="/images/banner/top1.jpg"
                            alt="One"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src="/images/banner/top2.jpg"
                            alt="Two"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <img
                            className="d-block w-100"
                            src="/images/banner/top3.png"
                            alt="Three"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className="products productsHome margin-control">
                <h4 className="tag">Featured Products</h4>
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <BasicAlert variant="error">{error}</BasicAlert>
                ) : (
                    <div>
                        <div className="products-container">
                            {products.slice(0, productsLimit).map((product) => (
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
        </div>
    );
}
