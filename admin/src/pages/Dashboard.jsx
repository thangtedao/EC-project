import React, { createContext, useContext, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
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

const Wrapper = styled.div`
  width: 100%;

  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
`;

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
    console.log(error);
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

  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(monthlyApplications);

  const startDateChange = (dates, dateString) => {
    if (dates) {
      const date = new Date(dateString);
      setMinDate(dayjs(date.toISOString().slice(0, 10), dateFormat));
      date.setMonth(11);
      date.setDate(31);
      console.log(date);
      setMaxDate(dayjs(date.toISOString().slice(0, 10), dateFormat));
      setStartDate(dateString);
    }
  };

  const endDateChange = (date, dateString) => {
    setEndDate(dateString);
  };

  const applyDateChange = async () => {
    console.log(startDate + " || " + endDate);
    if (startDate && endDate) {
      const response = await customFetch.post("/order/stats", {
        startDate,
        endDate,
      });
      setMonthlyStats(response.data.monthlyApplications);
    } else setShowWarningMessage(true);
  };

  return (
    <DashboardContext.Provider value={{ products, orders, monthlyStats }}>
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
                    <DatePicker
                      defaultValue={startDate}
                      onChange={startDateChange}
                      size="middle"
                    />
                    <DatePicker
                      defaultValue={endDate}
                      onChange={endDateChange}
                      minDate={minDate}
                      maxDate={maxDate}
                      size="middle"
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
                    <DatePicker size="middle" />
                    <DatePicker size="middle" />
                  </div>
                }
              >
                <ChartColumn />
              </Card>

              <Card
                className="col-1-item"
                size="large"
                title={"Order"}
                // extra={
                //   <Segmented
                //     options={[
                //       "Daily",
                //       "Weekly",
                //       "Monthly",
                //       "Quarterly",
                //       "Yearly",
                //     ]}
                //     onChange={(value) => {
                //       console.log(value); // string
                //     }}
                //   />
                // }
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
              <Card className="col-2-item" size="large" title={"Product"}>
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
