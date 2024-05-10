import React from "react";
import styled from "styled-components";
import { Column } from "@ant-design/charts";
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

  // const month = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];

  // const data = month.map((item) => {
  //   let totalRevenue = 0;
  //   let found = false;
  //   monthlyStats.forEach((element) => {
  //     if (element.date === item && !found) {
  //       totalRevenue += element.totalRevenue;
  //       found = true;
  //     }
  //   });
  //   return {
  //     date: item,
  //     revenue: totalRevenue,
  //   };
  // });

  const config = {
    data,
    height: 400,
    xField: "date",
    yField: "revenue",
    label: {
      style: {
        fill: "#000",
        fontSize: 12,
        fontWeight: "bold",
      },
      formatter: (value) => `${value.toLocaleString()}đ`,
    },
  };

  return (
    <Wrapper>
      <Column {...config} />
    </Wrapper>
  );
};

export default ChartColumn;
