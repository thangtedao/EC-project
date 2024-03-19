import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect, ProductCard } from "../components/index.js";
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

  .btn {
    width: 75px;
    height: 28px;
    border-radius: 10px;
    background-color: #035ecf;
    color: white;
    font-weight: bolder;
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

        <div className="dashboard-container">
          <div className="title">Dashboard</div>

          <div className="card-statistic">
            <div className="card-item">
              <div className="card-title">Total Revenue</div>
              <div className="card-content">
                {totalRevenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                  "₫"}
              </div>
            </div>
            <div className="card-item">
              <div className="card-title">Total Products Sold</div>
              <div className="card-content">{totalProduct}</div>
            </div>
            <div className="card-item">
              <div className="card-title">Total Orders</div>
              <div className="card-content">{totalCount}</div>
            </div>
          </div>

          <Form>
            <div style={{ display: "flex", gap: "1rem", padding: "1rem 0" }}>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <div style={{}}>From</div>
                <input
                  type="date"
                  name="start"
                  required
                  // defaultValue={new Date().toISOString().split("T")[0]}
                  value={startDate ? startDate?.split("T")[0] : ""}
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                />
                <div>To</div>
                <input
                  type="date"
                  name="end"
                  required
                  // defaultValue={new Date().toISOString().split("T")[0]}
                  value={endDate ? endDate?.split("T")[0] : ""}
                  onChange={(event) => {
                    setEndDate(event.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn">
                Apply
              </button>
            </div>
          </Form>

          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
            }}
          >
            {startDate && endDate && productMostSold.length > 0 && (
              <div>
                Sản phẩm bán chạy từ {startDate} đến {endDate}
              </div>
            )}
            <div
              style={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                columnGap: "1rem",
              }}
            >
              {productMostSold?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
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
