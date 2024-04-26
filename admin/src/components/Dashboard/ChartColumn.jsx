import React from "react";
import styled from "styled-components";
import { Column } from "@ant-design/charts";
import { useDashboardContext } from "../../pages/Dashboard";

const Wrapper = styled.div`
  /* margin: 64px 32px; */
`;

const ChartColumn = () => {
  const { monthlyStats, startDate, endDate } = useDashboardContext();

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = month.map((item) => {
    let totalRevenue = 0;
    let found = false;
    monthlyStats.forEach((element) => {
      if (element.date === item && !found) {
        totalRevenue += element.totalRevenue;
        found = true;
      }
    });
    return {
      date: item,
      revenue: totalRevenue,
    };
  });

  const config = {
    data,
    height: 400,
    xField: "date",
    yField: "revenue",
  };

  return (
    <Wrapper>
      <Column {...config} />
    </Wrapper>
  );
};

export default ChartColumn;
