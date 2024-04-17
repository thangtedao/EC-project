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
import { Breadcrumb, Card, Segmented } from "antd";

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

  // let start, end;
  // if (!params.start && !params.end) {
  //   end = new Date();
  //   start = new Date(end);
  //   start.setMonth(start.getMonth() - 10);
  //   end = end.toISOString().split("T")[0];
  //   start = start.toISOString().split("T")[0];
  // }

  // const [startDate, setStartDate] = useState(params.start || start);
  // const [endDate, setEndDate] = useState(params.end || end);

  return (
    <DashboardContext.Provider value={{ products, orders }}>
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
                <ChartLine />
              </Card>

              <Card
                className="col-1-item"
                size="large"
                title={"Revenue"}
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
