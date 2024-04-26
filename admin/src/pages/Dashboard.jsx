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
import { Breadcrumb, Card, Segmented, DatePicker, Button, message } from "antd";
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

    const endDate = dayjs().startOf("day").format(dateFormat);
    const startDate = dayjs()
      .subtract(12, "month")
      .startOf("day")
      .format("YYYY-MM-DD");
    const response = await customFetch.post("/order/stats", {
      startDate,
      endDate,
    });
    const { monthlyApplications } = response.data;

    const products = await customFetch
      .get(`/product/?populate=category`)
      .then(({ data }) => data);

    const orders = await customFetch.get(`/order/`).then(({ data }) => data);

    return { products, orders, monthlyApplications };
  } catch (error) {
    if (error?.response?.status === 403) return redirect("/login");
    return error;
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  const { products, orders, monthlyApplications } = useLoaderData();

  const [showWarningMessage, setShowWarningMessage] = useState(false);
  useEffect(() => {
    if (showWarningMessage) {
      message.warning("Please select date!!!");
      setShowWarningMessage(false);
    }
  }, [showWarningMessage]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(monthlyApplications);

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
      } else setShowWarningMessage(true);
    } catch (error) {
      return;
    }
  };

  return (
    <DashboardContext.Provider
      value={{ products, orders, monthlyStats, startDate, endDate }}
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
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={"Revenue"}
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

              <Card
                className="col-1-item"
                size="large"
                title={"Revenue"}
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

              <Card
                className="col-1-item"
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
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card className="col-2-item" size="large" title={"Order Status"}>
                <ChartPie />
              </Card>
              <Card
                className="col-2-item"
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
            </div>
          </div>
        </Wrapper>
      </HelmetProvider>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;
