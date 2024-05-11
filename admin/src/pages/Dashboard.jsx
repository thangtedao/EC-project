import React, { createContext, useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/dashboard/Dashboard.js";
import { useLoaderData, redirect } from "react-router-dom";
import ChartPie from "../components/Dashboard/ChartPie.jsx";
import ChartColumn from "../components/Dashboard/ChartColumn.jsx";
import ChartLine from "../components/Dashboard/ChartLine.jsx";
import DashboardOrder from "../components/Dashboard/DashboardOrder.jsx";
import DashboardProduct from "../components/Dashboard/DashboardProduct.jsx";
import RevenueStatistics from "../components/Dashboard/RevenueStatistics.jsx";
import ChartOrder from "../components/Dashboard/ChartOrder.jsx";
import DashboardCustomer from "../components/Dashboard/DashboardCustomer.jsx";
import ChartPieCustomer from "../components/Dashboard/ChartPieCustomer.jsx";
import ChartProduct from "../components/Dashboard/ChartProduct.jsx";
import {
  Breadcrumb,
  Card,
  Segmented,
  DatePicker,
  Button,
  message,
  Statistic,
  Col,
  Row,
  Divider,
} from "antd";
import {
  LaptopOutlined,
  DollarOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const { RangePicker } = DatePicker;

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const end = dayjs().startOf("day").format(dateFormat);
    const start = dayjs()
      .subtract(1, "month")
      .startOf("day")
      .format(dateFormat);
    const response = await customFetch.post("/order/stats", {
      startDate: start,
      endDate: end,
    });
    const {
      monthlyApplications,
      dailyApplications,
      totalRevenue,
      totalOrder,
      totalProduct,
      totalUser,
      orders,
      products,
    } = response.data;

    const ordersData = await customFetch
      .get(`/order/?admin=true`)
      .then(({ data }) => data);

    return {
      start,
      end,
      products,
      orders,
      ordersData,
      monthlyApplications,
      dailyApplications,
      totalRevenue,
      totalOrder,
      totalProduct,
      totalUser,
    };
  } catch (error) {
    if (error?.response?.status === 403) return redirect("/login");
    return error;
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  const {
    start,
    end,
    products,
    orders,
    ordersData,
    monthlyApplications,
    dailyApplications,
    totalRevenue,
    totalOrder,
    totalProduct,
    totalUser,
  } = useLoaderData();

  const [showWarningMessage, setShowWarningMessage] = useState(false);
  useEffect(() => {
    if (showWarningMessage) {
      message.warning("Please select date!!!");
      setShowWarningMessage(false);
    }
  }, [showWarningMessage]);

  const [startDate, setStartDate] = useState(dayjs(start));
  const [endDate, setEndDate] = useState(dayjs(end));
  const [monthlyStats, setMonthlyStats] = useState(monthlyApplications);
  const [dailyStats, setDailyStats] = useState(dailyApplications);
  const [monthlyOrders, setmonthlyOrders] = useState(orders);
  const [monthlyProducts, setMonthlyProducts] = useState(products);

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

  const applyDateChange = async () => {
    try {
      if (startDate && endDate) {
        const response = await customFetch.post("/order/stats", {
          startDate: startDate.format(dateFormat),
          endDate: endDate.format(dateFormat),
        });
        setMonthlyStats(response.data.monthlyApplications);
        setDailyStats(response.data.dailyApplications);
        setmonthlyOrders(response.data.orders);
        setMonthlyProducts(response.data.products);
      } else setShowWarningMessage(true);
    } catch (error) {
      return;
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        monthlyProducts,
        monthlyOrders,
        monthlyStats,
        dailyStats,
        startDate,
        endDate,
        ordersData,
      }}
    >
      <HelmetProvider>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Dashboard</title>
          </Helmet>
          <Breadcrumb
            style={{ paddingBottom: "1rem" }}
            items={[
              {
                title: "Dashboard",
              },
            ]}
          />

          <div className="title">Dashboard</div>
          {/* REVENUE CARD */}
          <div className="revenue">
            <RevenueStatistics
              totalRevenue={totalRevenue}
              totalProduct={totalProduct}
              totalOrder={totalOrder}
              totalUser={totalUser}
            />
          </div>
          {/* REVENUE CHART */}
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={"Overview"}
                extra={
                  <div style={{ display: "flex", gap: 20 }}>
                    <RangePicker
                      value={[startDate, endDate]}
                      onChange={handleDateRangeChange}
                    />
                    <Button onClick={() => applyDateChange()}>Apply</Button>
                  </div>
                }
              >
                <ChartLine />
              </Card>
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-2-item"
                size="large"
                title={"Overview"}
                extra={
                  <div style={{ display: "flex", gap: 20 }}>
                    <RangePicker
                      value={[startDate, endDate]}
                      onChange={handleDateRangeChange}
                    />
                    <Button onClick={() => applyDateChange()}>Apply</Button>
                  </div>
                }
              >
                <ChartColumn />
              </Card>
            </div>
          </div>
          <Divider />
          {/* ORDER TABLE */}

          <Card
            size="large"
            title={"Order"}
            extra={
              <div style={{ display: "flex", gap: 20 }}>
                <RangePicker
                  value={[startDate, endDate]}
                  onChange={handleDateRangeChange}
                />
                <Button onClick={() => applyDateChange()}>Apply</Button>
              </div>
            }
          >
            <DashboardOrder />
          </Card>

          {/* ORDER CHART */}

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            <div
              className="col-3"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-3-item"
                size="large"
                title={"Order Statistic "}
                extra={
                  <div style={{ display: "flex", gap: 20 }}>
                    <RangePicker
                      value={[startDate, endDate]}
                      onChange={handleDateRangeChange}
                    />
                    <Button onClick={() => applyDateChange()}>Apply</Button>
                  </div>
                }
              >
                <ChartOrder />
              </Card>
            </div>

            <div
              className="col-4"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-4-item"
                size="large"
                title={"All Order Status"}
              >
                <ChartPie />
              </Card>
            </div>
          </div>
          <Divider />

          {/* PRODUCT TABLE*/}

          <Card
            size="large"
            title={"Product"}
            extra={
              <div style={{ display: "flex", gap: 20 }}>
                <RangePicker
                  value={[startDate, endDate]}
                  onChange={handleDateRangeChange}
                />
                <Button onClick={() => applyDateChange()}>Apply</Button>
              </div>
            }
          >
            <DashboardProduct />
          </Card>
          {/* PRODUCT CHART*/}
          <Card
            style={{ marginTop: "20px" }}
            size="large"
            title={"Conversion rate"}
            extra={
              <div style={{ display: "flex", gap: 20 }}>
                <RangePicker
                  value={[startDate, endDate]}
                  onChange={handleDateRangeChange}
                />
                <Button onClick={() => applyDateChange()}>Apply</Button>
              </div>
            }
          >
            <ChartProduct />
          </Card>

          <Divider />

          {/* USER TABLE*/}
          <Card
            size="large"
            title={"Customer"}
            extra={
              <div style={{ display: "flex", gap: 20 }}>
                <RangePicker
                  value={[startDate, endDate]}
                  onChange={handleDateRangeChange}
                />
                <Button onClick={() => applyDateChange()}>Apply</Button>
              </div>
            }
          >
            <DashboardCustomer />
          </Card>
          {/* CUSTOMER CHART */}

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              marginBottom: "2rem",
              marginTop: "2rem",
            }}
          >
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card className="col-1-item" size="large" title={"Customer Rank"}>
                <ChartPieCustomer />
              </Card>
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* Biểu đồ tròn Customer Rank */}
              <Card
                className="col-2-item"
                size="large"
                title={"Customer Status"}
              >
                <ChartPieCustomer />
              </Card>
            </div>
          </div>
          <Divider />
        </Wrapper>
      </HelmetProvider>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
