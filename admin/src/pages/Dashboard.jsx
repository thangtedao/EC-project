import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components/index.js";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
// import { BarChart } from "@mui/x-charts/BarChart";
// import { LineChart } from "@mui/x-charts/LineChart";
// import { PieChart } from "@mui/x-charts/PieChart";
import { axisClasses } from "@mui/x-charts";
import { Line } from "@ant-design/charts";
import ChartPie from "../components/Dashboard/ChartPie.jsx";
import ChartColumn from "../components/Dashboard/ChartColumn.jsx";
import ChartLine from "../components/Dashboard/ChartLine.jsx";
import DashboardOrder from "../components/Dashboard/DashboardOrder.jsx";
import DashboardProduct from "../components/Dashboard/DashboardProduct.jsx";
import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Table,
  Button,
  Typography,
  Tag,
  Dropdown,
  Card,
} from "antd";
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
    const response = await customFetch.get("/order/stats", { params });
    return {
      dataset: response.data.monthlyApplications,
      totalRevenue: response.data.totalRevenue,
      totalCount: response.data.totalCount,
      totalProduct: response.data.totalProduct,
      productMostSold: response.data.productMostSold,
      params,
    };
  } catch (error) {
    return error;
  }
};

const Dashboard = () => {
  const {
    dataset,
    totalRevenue,
    totalCount,
    totalProduct,
    productMostSold,
    params,
  } = useLoaderData();

  let start, end;
  if (!params.start && !params.end) {
    end = new Date();
    start = new Date(end);
    start.setMonth(start.getMonth() - 10);
    end = end.toISOString().split("T")[0];
    start = start.toISOString().split("T")[0];
  }

  const [startDate, setStartDate] = useState(params.start || start);
  const [endDate, setEndDate] = useState(params.end || end);

  const chartSetting = {
    yAxis: [
      {
        label: "vnđ",
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-60px, 0)",
        fontWeight: "bold",
      },
    },
  };

  return (
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
              title={"column"}
              extra={"select Day mond"}
            >
              <ChartLine />
            </Card>
            <Card
              className="col-1-item"
              size="large"
              title={"column"}
              extra={"select Day mond"}
            >
              <ChartColumn />
            </Card>
            <Card
              className="col-1-item"
              size="large"
              title={"Order"}
              extra={"select Day mond"}
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
              extra={"select Day mond"}
            >
              <ChartPie />
            </Card>
            <Card
              className="col-2-item"
              size="large"
              title={"Product"}
              extra={"select Day mond"}
            >
              <DashboardProduct />
            </Card>
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Dashboard;
