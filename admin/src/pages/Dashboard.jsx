import React, { createContext, useContext, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useLoaderData } from "react-router-dom";
import ChartPie from "../components/Dashboard/ChartPie.jsx";
import ChartColumn from "../components/Dashboard/ChartColumn.jsx";
import ChartLine from "../components/Dashboard/ChartLine.jsx";
import DashboardOrder from "../components/Dashboard/DashboardOrder.jsx";
import DashboardProduct from "../components/Dashboard/DashboardProduct.jsx";
import { Breadcrumb, Card, Segmented, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

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

    // const response = await customFetch.get("/order/stats", { params });

    const products = await customFetch
      .get(`/product/?populate=category,brand`)
      .then(({ data }) => data);

    const orders = await customFetch.get(`/order/`).then(({ data }) => data);

    return { products, orders };
  } catch (error) {
    return error;
  }
};

const DashboardContext = createContext();

const Dashboard = () => {
  const { products, orders } = useLoaderData();

  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD";

  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  const [selectType, setSelectType] = useState("Daily");

  const startDateChange = (dates, dateString) => {
    if (dates) {
      const date = new Date(dateString);
      date.setDate(date.getDate() + 1);
      setMinDate(dayjs(date.toISOString().slice(0, 10), dateFormat));

      switch (selectType) {
        case "Daily": {
          date.setDate(date.getDate() + 6);
          setMaxDate(dayjs(date.toISOString().slice(0, 10), dateFormat));
          break;
        }

        case "Monthly": {
          date.setMonth(date.getMonth() + 12);
          setMaxDate(dayjs(date.toISOString().slice(0, 10), dateFormat));
          break;
        }

        default: {
          date.setFullYear(date.getFullYear() + 12);
          setMaxDate(
            dayjs(date.toISOString().slice(0, 10).toString(), dateFormat)
          );
          break;
        }
      }
    }
  };

  const endDateChange = (date, dateString) => {};

  const applyDateChange = async () => {
    //fetch data
  };

  return (
    <DashboardContext.Provider value={{ products, orders, selectType }}>
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
                    <DatePicker onChange={startDateChange} size="middle" />
                    <DatePicker
                      onChange={endDateChange}
                      minDate={minDate}
                      maxDate={maxDate}
                      size="middle"
                    />
                    <Button onClick={() => applyDateChange()}>Apply</Button>
                    <Segmented
                      options={["Daily", "Monthly", "Yearly"]}
                      onChange={(value) => {
                        console.log(value); // string
                        setSelectType(value);
                      }}
                    />
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
                    <Segmented
                      options={[
                        "Daily",
                        "Weekly",
                        "Monthly",
                        "Quarterly",
                        "Yearly",
                      ]}
                      onChange={(value) => {
                        console.log(value); // string
                      }}
                    />
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
                  <Segmented
                    options={[
                      "Daily",
                      "Weekly",
                      "Monthly",
                      "Quarterly",
                      "Yearly",
                    ]}
                    onChange={(value) => {
                      console.log(value); // string
                    }}
                  />
                }
              >
                <DashboardOrder />
              </Card>
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-2-item"
                size="large"
                title={"Order Status"}
                extra={
                  <Segmented
                    options={[
                      "Daily",
                      "Weekly",
                      "Monthly",
                      "Quarterly",
                      "Yearly",
                    ]}
                    onChange={(value) => {
                      console.log(value); // string
                    }}
                  />
                }
              >
                <ChartPie />
              </Card>
              <Card
                className="col-2-item"
                size="large"
                title={"Product"}
                extra={
                  <Segmented
                    options={[
                      "Daily",
                      "Weekly",
                      "Monthly",
                      "Quarterly",
                      "Yearly",
                    ]}
                    onChange={(value) => {
                      console.log(value); // string
                    }}
                  />
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
