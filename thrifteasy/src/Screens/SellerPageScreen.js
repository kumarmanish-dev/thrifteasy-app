import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/ProductActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import Rating from "../Components/Rating";
import Product from "../Components/Product";

export default function SellerPageScreen(props) {
    const sellerID = props.match.params.id;
    const productsList = useSelector((state) => state.productsList);
    const {
        loading: loadingProducts,
        error: errorProducts,
        products,
    } = productsList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts({ sellerID: sellerID }));
    }, [dispatch, sellerID]);
    return (
        <div className="sellerpagescreen bottom-control">
            <div>
                <h4 className="tag">Seller Details</h4>
                {loadingProducts ? (
                    <LoadingBox></LoadingBox>
                ) : errorProducts ? (
                    <BasicAlert></BasicAlert>
                ) : (
                    <>
                        <div className="sellerpage card">
                            <div className="card-body">
                                <div className="flex">
                                    <div className="picdiv">
                                        {products[0].seller.seller.logo !==
                                            "None" && (
                                            <img
                                                className="small"
                                                src={
                                                    products[0].seller.seller
                                                        .logo
                                                }
                                                alt={
                                                    products[0].seller.seller
                                                        .name
                                                }
                                            ></img>
                                        )}
                                    </div>
                                    <div>
                                        <div>
                                            <h1>
                                                {products[0].seller.seller.name}
                                            </h1>
                                        </div>
                                        <div className="rating2">
                                            <Rating
                                                rating={
                                                    products[0].seller.seller
                                                        .rating
                                                }
                                                numOfReviews={`${products[0].seller.seller.numOfReviews}`}
                                            ></Rating>
                                        </div>
                                        <div>
                                            <h5>
                                                Description{" "}
                                                <i className="fas fa-info-circle green"></i>
                                            </h5>
                                            <span id="description">
                                                {
                                                    products[0].seller.seller
                                                        .description
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <h4 className="tag">Seller Products</h4>
            </div>
            <div className="products">
                {loadingProducts ? (
                    <LoadingBox></LoadingBox>
                ) : errorProducts ? (
                    <BasicAlert variant="error">{errorProducts}</BasicAlert>
                ) : (
                    <>
                        {products.length === 0 && (
                            <BasicAlert>
                                Seller has not added any products
                            </BasicAlert>
                        )}
                        <div className="products-container productsHome">
                            {products.map((product) => (
                                <Product
                                    key={product._id}
                                    product={product}
                                ></Product>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
