import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsSellerDashboard } from "../Actions/OrderActions";
import LoadingBox from "../Components/LoadingBox";
import BasicAlert from "../Components/BasicAlert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Chart from "react-google-charts";

export default function SellerDashboardScreen() {
    const dispatch = useDispatch();
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userData } = userLogIn;
    const sellerDashboardDetails = useSelector(
        (state) => state.sellerDashboardDetails
    );
    const { loading, error, details } = sellerDashboardDetails;
    useEffect(() => {
        dispatch(
            detailsSellerDashboard({ sellerID: userData ? userData._id : "" })
        );
    }, [dispatch, userData]);
    return (
        <div>
            <div>
                <h4 className="tag">Seller Dashboard</h4>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <BasicAlert variant="error">{error}</BasicAlert>
            ) : (
                <>
                    {details &&
                    details[0] &&
                    details[0].orders &&
                    details[0].orders[0] && details[0].orders[0].numOrders > 0 ? (
                        <>
                            <h4>Orders and Revenue</h4>
                            <Row>
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {details &&
                                                    details[0] &&
                                                    details[0].orders &&
                                                    details[0].orders[0] &&
                                                    (details[0].orders[0]
                                                        .numOrders
                                                        ? details[0].orders[0]
                                                              .numOrders
                                                        : 0)}
                                            </Card.Title>
                                            <Card.Text>Orders</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {details &&
                                                    details[0] &&
                                                    details[0].orders &&
                                                    details[0].orders[0] &&
                                                    (details[0].orders[0]
                                                        .totalSales
                                                        ? details[0].orders[0].totalSales.toFixed(
                                                              2
                                                          )
                                                        : 0)}
                                            </Card.Title>
                                            <Card.Text>Total Sales</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {details &&
                                                    details[0] &&
                                                    details[0].orders &&
                                                    details[0].orders[0] &&
                                                    (details[0].orders[0]
                                                        .totalSales
                                                        ? (
                                                              (details[0]
                                                                  .orders[0]
                                                                  .totalSales /
                                                                  100) *
                                                              95
                                                          ).toFixed(2)
                                                        : 0)}
                                            </Card.Title>
                                            <Card.Text>My Profit</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={3}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                {details &&
                                                    details[0] &&
                                                    details[0].orders &&
                                                    details[0].orders[0] &&
                                                    (details[0].orders[0]
                                                        .fundsToRelease
                                                        ? details[0].orders[0].fundsToRelease.toFixed(
                                                              2
                                                          )
                                                        : 0)}
                                            </Card.Title>
                                            <Card.Text>
                                                Funds to receive from ThriftEasy
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <br></br>
                            <h4>Sales</h4>
                            {details &&
                            details[0] &&
                            details[0].dailySales &&
                            details[0].dailySales[0] ? (
                                <Chart
                                    width="100%"
                                    height="400px"
                                    chartType="AreaChart"
                                    data={[
                                        ["Date", "Sales"],
                                        ...details[0].dailySales.map((x) => [
                                            x._id,
                                            x.sales,
                                        ]),
                                    ]}
                                ></Chart>
                            ) : (
                                <h3>No Sales</h3>
                            )}
                        </>
                    ) : (
                        <h3 className="allcentered">No sales</h3>
                    )}
                </>
            )}
        </div>
    );
}
