import React from "react";
import styled from "styled-components";
import { Line } from "@ant-design/charts";
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
          date:
            item._id.day +
            "/" +
            item._id.month +
            "/" +
            item._id.year.toString().slice(2, 4),
          revenue: item.totalRevenue,
        };
      })
      .reverse();
  } else {
    data = monthlyStats
      .map((item) => {
        return {
          date: item._id.month + "/" + item._id.year,
          revenue: item.totalRevenue,
        };
      })
      .reverse();
  }

  const config = {
    data,
    height: 400,
    xField: "date",
    yField: "revenue",
    label: {
      style: {
        fill: "#000",
        fontSize: 13,
        fontWeight: "bold",
      },
      formatter: (value) => `${value.toLocaleString()}đ`,
    },
  };

  return (
    <Wrapper>
      <Line {...config} />
    </Wrapper>
  );
};

export default ChartLine;
