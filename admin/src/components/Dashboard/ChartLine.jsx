import React from "react";
import styled from "styled-components";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useDashboardContext } from "../../pages/Dashboard";

const Wrapper = styled.div`
  /* margin: 64px 32px; */
`;

const ChartLine = () => {
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
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          {/* <YAxis tickFormatter={(value) => `${value.toLocaleString()}₫`} /> */}
          <Tooltip formatter={(value) => `${value.toLocaleString()}đ`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="Revenue"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
            label={{
              position: "right",
              value: "Revenue",
              dy: -5,
              fontSize: 13,
              formatter: (value) => `${value.toLocaleString()}₫`,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

export default ChartLine;
