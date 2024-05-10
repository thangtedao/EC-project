import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDashboardContext } from "../../pages/Dashboard";

const Wrapper = styled.div`
  /* margin: 64px 32px; */
`;

const ChartColumn = () => {
  const { monthlyStats, dailyStats, startDate, endDate } =
    useDashboardContext();

  const numOfDays = endDate.diff(startDate, "day");

  let data = [];
  if (numOfDays <= 10 || dailyStats.length <= 9) {
    data = dailyStats
      .map((item) => {
        return {
          name:
            item._id.day +
            "/" +
            item._id.month +
            "/" +
            item._id.year.toString().slice(2, 4),
          Revenue: item.totalRevenue,
        };
      })
      .reverse();
  } else {
    data = monthlyStats
      .map((item) => {
        return {
          name: item._id.month + "/" + item._id.year,
          Revenue: item.totalRevenue,
        };
      })
      .reverse();
  }

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 8,
            right: 30,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `${value.toLocaleString()}đ`} />
          <Legend />
          <Bar
            dataKey="Revenue"
            fill="#0d00ff"
            label={{
              position: "top",
              value: "Revenue",
              fill: "#000",
              fontSize: 13,
              dy: -2,
              formatter: (value) => `${value.toLocaleString()}₫`,
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default ChartColumn;
