import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import { useDashboardContext } from "../../pages/Dashboard.jsx";

const Wrapper = styled.div`
  min-width: 250px;
`;

const ChartPieCustomer = () => {
  const { allUsers } = useDashboardContext();

  const labels = ["member", "silver", "gold", "diamond"];

  const series = labels.map((item) =>
    allUsers.reduce(
      (count, user) => (user.rank === item ? count + 1 : count),
      0
    )
  );

  const colors = ["#acf3b8", "#C0C0C0", "#ece908", "#3fb9d4"];

  const options = {
    series: series,
    labels: labels,
    chart: {
      type: "donut",
    },
    colors: colors,
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val.toFixed(0) + "%";
      },
      dropShadow: {
        enabled: true,
        blur: 5,
        opacity: 0.3,
        color: "#000000",
        left: -2,
        top: 2,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
          },
          size: "50%",
        },
      },
    },
  };

  return (
    <Wrapper>
      <Chart
        options={options}
        series={options.series}
        type="donut"
        width="100%"
        height="300px"
      />
    </Wrapper>
  );
};

export default ChartPieCustomer;
