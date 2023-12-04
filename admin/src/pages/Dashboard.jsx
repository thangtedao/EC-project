import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect } from "../components";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { axisClasses } from "@mui/x-charts";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .dashboard-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .card-statistic {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }
  .card-item {
    width: 30%;
    height: 120px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: transparent;
    border-radius: 5px;
    padding: 1rem;
    box-shadow: 0 1px 3px #00000026;
    background-color: white;
    .card-title {
      font-size: 1.1rem;
      color: #8d8d99;
    }
    .card-content {
      font-size: 1.8rem;
      font-weight: bold;
      color: #00193b;
    }
  }

  .charts-container {
    width: 100%;
    display: grid;
    place-items: center;
    gap: 2rem;
  }
`;

export const loader = async () => {
  try {
    const response = await customFetch.get("/order/stats");
    return {
      dataset: response.data.monthlyApplications,
      totalRevenue: response.data.totalRevenue,
      totalCount: response.data.totalCount,
    };
  } catch (error) {
    return error;
  }
};

const Dashboard = () => {
  const { dataset, totalRevenue, totalCount } = useLoaderData();

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

        <div className="dashboard-container">
          <div className="title">Dashboard</div>
          <div className="card-statistic">
            <div className="card-item">
              <div className="card-title">Total Revenue</div>
              <div className="card-content">{totalRevenue + "₫"}</div>
            </div>
            <div className="card-item">
              <div className="card-title">Average order value</div>
              <div className="card-content">999</div>
            </div>
            <div className="card-item">
              <div className="card-title">Total orders</div>
              <div className="card-content">{totalCount}</div>
            </div>
          </div>
          {dataset.length > 0 && (
            <div className="charts-container">
              <BarChart
                dataset={dataset}
                xAxis={[{ scaleType: "band", dataKey: "date" }]}
                series={[{ dataKey: "totalRevenue", label: "Total Revenue" }]}
                width={800}
                height={400}
                margin={{
                  left: 100,
                }}
                {...chartSetting}
              />
              <LineChart
                dataset={dataset}
                xAxis={[{ scaleType: "band", dataKey: "date" }]}
                series={[{ dataKey: "totalRevenue", label: "Total Revenue" }]}
                width={800}
                height={400}
                margin={{
                  left: 100,
                }}
                {...chartSetting}
              />
              <PieChart
                series={[
                  {
                    data: dataset.map((dataPoint, index) => {
                      return {
                        id: index,
                        value: dataPoint.totalRevenue,
                        label: dataPoint.date,
                      };
                    }),
                  },
                ]}
                width={600}
                height={400}
              />
            </div>
          )}
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Dashboard;
