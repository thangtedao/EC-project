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

const Wrapper = styled.div`
  width: 100%;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .dashboard-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .card-statistic {
    display: flex;
  }
  .card-item {
    width: 200px;
    height: 180px;
    border: 1px solid #00193b;
    .card-title {
      font-weight: bolder;
      color: #8d8d99;
    }
    .card-content {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .charts-container {
    width: 100%;
    display: grid;
    place-items: center;
    gap: 1rem;
  }
`;

export const loader = async () => {
  try {
    const response = await customFetch.get("/order/stats");
    return response.data.monthlyApplications;
  } catch (error) {
    return error;
  }
};

const Dashboard = () => {
  const dataset = useLoaderData();

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
              <div className="card-title">Total sells</div>
              <div className="card-content">9999đ</div>
            </div>
            <div className="card-item">
              <div className="card-title">Average order value</div>
              <div className="card-content">9999đ</div>
            </div>
            <div className="card-item">
              <div className="card-title">Total orders</div>
              <div className="card-content">9999</div>
            </div>
          </div>

          <div className="charts-container">
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "date" }]}
              series={[{ dataKey: "totalRevenue", label: "Total Revenue" }]}
              width={600}
              height={400}
              margin={{
                left: 100,
              }}
            />
            <LineChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "date" }]}
              series={[{ dataKey: "totalRevenue", label: "Total Revenue" }]}
              width={600}
              height={400}
              margin={{
                left: 100,
              }}
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
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Dashboard;
