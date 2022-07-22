import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { logOut, detailsUser } from "./Actions/UserActions";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import OrderDetailsScreen from "./Screens/OrderDetailsScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import OrderPlacementScreen from "./Screens/OrderPlacementScreen";
import ProductDetailsScreen from "./Screens/ProductDetailsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import LogInScreen from "./Screens/LogInScreen";
import UserRoute from "./Components/UserRoute";
import AdminRoute from "./Components/AdminRoute";
import SellerRoute from "./Components/SellerRoute";
import OrdersListScreen from "./Screens/OrdersListScreen";
import CreateProductScreen from "./Screens/CreateProductScreen";
import ProductsListScreen from "./Screens/ProductsListScreen";
import EditProductScreen from "./Screens/EditProductScreen";
import UsersListScreen from "./Screens/UsersListScreen";
import SellerProfileScreen from "./Screens/SellerProfileScreen";
import { USER_SELLER_NAME_RESET } from "./Constants/UserConstants";
import SellerPageScreen from "./Screens/SellerPageScreen";
import SearchProducts from "./Components/SearchProducts";
import SearchProductsScreen from "./Screens/SearchProductsScreen";
import BecomeASellerScreen from "./Screens/BecomeASellerScreen";
import SellerRequestsList from "./Screens/SellerRequestsList";
import AdminDashboardScreen from "./Screens/AdminDashboardScreen";
import SellerDashboardScreen from "./Screens/SellerDashboardScreen";

function App() {
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logOut());
    };
    const userDetails = useSelector((state) => state.userDetails);
    const { loading: loadingDetails, user } = userDetails;
    const updateStoreName = useSelector((state) => state.updateStoreName);
    const { success: successStoreName } = updateStoreName;
    useEffect(() => {
        dispatch({ type: USER_SELLER_NAME_RESET });
        if (userData) {
            dispatch(detailsUser(userData._id));
        }
    }, [dispatch, userData, successStoreName]);
    const [storeName, setStoreName] = useState("");
    useEffect(() => {
        if (user) {
            setStoreName(user.seller.name);
        }
    }, [user]);

    return (
        <BrowserRouter>
            <div className="grid-container">
                <header>
                    <h1 className="logo top">
                        <Link to="/">ThriftEasy</Link>
                    </h1>
                    <div>
                        <Route
                            render={({ history }) => (
                                <SearchProducts
                                    history={history}
                                ></SearchProducts>
                            )}
                        ></Route>
                    </div>
                    <div>
                        <ul id="navbar">
                            <li>
                                <div className="dropdown">
                                    <Link to="/">
                                        HOME <i className="fas fa-home"></i>
                                    </Link>
                                </div>
                            </li>
                            <li>
                                {userData ? (
                                    <div className="dropdown">
                                        <Link to="/profile">
                                            {userData.name.toUpperCase()}{" "}
                                            <i className="fas fa-id-card"></i>
                                        </Link>
                                        <ul className="dropdown-content">
                                            <li>
                                                <Link to="/profile">
                                                    User Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/orderhistory">
                                                    My Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/"
                                                    onClick={logOutHandler}
                                                >
                                                    Log Out
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="dropdown">
                                        <Link to="/login">
                                            ACCOUNT{" "}
                                            <i className="fas fa-id-card"></i>
                                        </Link>
                                        <ul className="dropdown-content">
                                            <li>
                                                <Link to="/login">Log In</Link>
                                            </li>
                                            <li>
                                                <Link to="/register">
                                                    Register
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </li>
                            {userData && userData.isSeller && (
                                <li>
                                    <div className="dropdown">
                                        <Link to="/sellerdashboard">
                                            {!loadingDetails &&
                                                storeName.toUpperCase()}{" "}
                                            <i className="fas fa-store"></i>
                                        </Link>
                                        <ul className="dropdown-content">
                                            <li>
                                                <Link to="/sellerdashboard">
                                                    Seller Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/sellerprofile">
                                                    Seller Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/productslist/seller">
                                                    My Products
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/orderlist/seller">
                                                    My Orders
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            )}
                            {userData && userData.adminLevel >= 1 && (
                                <li>
                                    <div className="dropdown">
                                        <Link to="/admindashboard">
                                            ADMIN <i className="fas fa-key"></i>
                                        </Link>
                                        <ul className="dropdown-content">
                                            <li>
                                                <Link to="/admindashboard">
                                                    Admin Dashboard
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/userslist">
                                                    All Users
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/sellerrequestlist">
                                                    Seller Requests
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to="/productslist">
                                                    All Products
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            )}
                            {userData ? (
                                userData.adminLevel >= 1 ||
                                userData.isSeller ? (
                                    <></>
                                ) : (
                                    <li>
                                        <div className="dropdown">
                                            <Link to="/cart">
                                                CART{" "}
                                                <i className="fas fa-shopping-cart">
                                                    {cartItems.length > 0 && (
                                                        <span>
                                                            {cartItems.length}
                                                        </span>
                                                    )}
                                                </i>
                                            </Link>
                                        </div>
                                    </li>
                                )
                            ) : (
                                <li>
                                    <div className="dropdown">
                                        <Link to="/cart">
                                            CART{" "}
                                            <i className="fas fa-shopping-cart">
                                                {cartItems.length > 0 && (
                                                    <span>
                                                        {cartItems.length}
                                                    </span>
                                                )}
                                            </i>
                                        </Link>
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </header>
                <main>
                    <Route path="/" component={HomeScreen} exact></Route>
                    <Route
                        path="/product/:id"
                        component={ProductDetailsScreen}
                        exact
                    ></Route>
                    <Route path="/cart/:id?" component={CartScreen}></Route>
                    <Route path="/login" component={LogInScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingScreen}></Route>
                    <Route path="/payment" component={PaymentScreen}></Route>
                    <Route
                        path="/orderplacement"
                        component={OrderPlacementScreen}
                    ></Route>
                    <Route
                        path="/order/:id?"
                        component={OrderDetailsScreen}
                    ></Route>
                    <Route
                        path="/seller/:id"
                        component={SellerPageScreen}
                    ></Route>
                    <Route
                        path="/search/name/:name?"
                        component={SearchProductsScreen}
                    ></Route>
                    <UserRoute
                        path="/profile"
                        component={ProfileScreen}
                    ></UserRoute>
                    <UserRoute
                        path="/becomeaseller"
                        component={BecomeASellerScreen}
                    ></UserRoute>
                    <SellerRoute
                        path="/sellerprofile"
                        component={SellerProfileScreen}
                    ></SellerRoute>
                    <Route
                        path="/orderhistory"
                        component={OrderHistoryScreen}
                    ></Route>
                    <SellerRoute
                        path="/orderlist/seller"
                        component={OrdersListScreen}
                    ></SellerRoute>
                    <AdminRoute
                        path="/admindashboard"
                        component={AdminDashboardScreen}
                    ></AdminRoute>
                    <AdminRoute
                        path="/userslist"
                        component={UsersListScreen}
                    ></AdminRoute>
                    <SellerRoute
                        path="/sellerdashboard"
                        component={SellerDashboardScreen}
                    ></SellerRoute>
                    <SellerRoute
                        path="/addproduct"
                        component={CreateProductScreen}
                    ></SellerRoute>
                    <SellerRoute
                        path="/products/:id/edit"
                        component={EditProductScreen}
                        exact
                    ></SellerRoute>
                    <AdminRoute
                        path="/productslist"
                        component={ProductsListScreen}
                        exact
                    ></AdminRoute>
                    <AdminRoute
                        path="/sellerrequestlist"
                        component={SellerRequestsList}
                        exact
                    ></AdminRoute>
                    <SellerRoute
                        path="/productslist/seller"
                        component={ProductsListScreen}
                    ></SellerRoute>
                </main>
                <footer>
                    <div className="footer-content">
                        <div className="newsletter padding-control">
                            <div className="text">
                                <h4>Subscribe to our Newsletter</h4>
                                <p>
                                    Get email notifications about our{" "}
                                    <span>latest offers</span> and{" "}
                                    <span>promotions</span>
                                </p>
                            </div>
                            <div className="form">
                                <input
                                    type="text"
                                    placeholder="Enter your email address"
                                ></input>
                                <button className="primary">Subscribe</button>
                            </div>
                        </div>
                        <div className="features padding-control">
                            <div className="feature-content">
                                <div>
                                    <i className="fas fa-shipping-fast"></i>
                                </div>
                                <div>
                                    <h4>Fast Shipping</h4>
                                    <p>Shipped in 1-3 days</p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="feature-content">
                                <div>
                                    <i className="far fa-history"></i>
                                </div>
                                <div>
                                    <h4>Free Returns</h4>
                                    <p>7 days return without any hassle</p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="feature-content">
                                <div>
                                    <i className="fas fa-hand-holding-usd"></i>
                                </div>
                                <div>
                                    <h4>Multiple Payment Types</h4>
                                    <p>Pay using CoD or online</p>
                                </div>
                            </div>
                            <div className="divider"></div>
                            <div className="feature-content">
                                <div>
                                    <i className="fas fa-user-headset"></i>
                                </div>
                                <div>
                                    <h4>Customer Support</h4>
                                    <p>Live chat or email support</p>
                                </div>
                            </div>
                        </div>
                        <div className="information padding-control">
                            <div className="col">
                                <h1 className="logo bottom">
                                    <Link to="/">ThriftEasy</Link>
                                </h1>
                                <h4>Contact</h4>
                                <p>
                                    <strong>Address: </strong>100 Szabist, Do
                                    Talwar, Karachi
                                </p>
                                <p>
                                    <strong>Phone: </strong>0332-0805125
                                </p>
                                <p>
                                    <strong>Support Hours: </strong>Monday -
                                    Sunday, 8:00 AM - 3:00PM
                                </p>
                            </div>
                            <div className="col colored">
                                <h4>About Us</h4>
                                <Link to="/">About Us</Link>
                                <Link to="/">Delivery Information</Link>
                                <Link to="/">FAQs</Link>
                                <Link to="/">Privacy Policy</Link>
                                <Link to="/">Terms & Conditions</Link>
                                <Link to="/">Contact Information</Link>
                            </div>
                            <div className="col colored">
                                <h4>Account</h4>
                                {userData ? (
                                    <Link to="/profile">My Profile</Link>
                                ) : (
                                    <Link to="/login">Log In</Link>
                                )}
                                <Link to="/orderhistory">My Orders</Link>
                                <Link to="/cart">My Cart</Link>
                                {userData &&
                                    !userData.isSeller &&
                                    !userData.adminLevel >= 1 && (
                                        <Link to="/becomeaseller">
                                            Become A Seller
                                        </Link>
                                    )}
                                {userData && (
                                    <Link to="/" onClick={logOutHandler}>
                                        Log Out
                                    </Link>
                                )}
                            </div>
                            <div className="col">
                                <h4>Follow Us</h4>
                                <div className="icon">
                                    <i className="fab fa-facebook"></i>
                                    <i className="fab fa-twitter"></i>
                                    <i className="fab fa-instagram"></i>
                                    <i className="fab fa-youtube"></i>
                                </div>
                                <h4>Online Payment Types</h4>
                                <img
                                    src="/images/others/paymenttypes.jpg"
                                    alt="Payment Types"
                                ></img>
                            </div>
                        </div>
                        <div className="copyright">
                            <p>
                                © 2021 - 2022, E Commerce Website by Manish
                                Kumar & Hassaan Ali. All Rights Reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
