import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import { ORDER_STATUS } from "../../utils/constants.js";
import { useDashboardContext } from "../../pages/Dashboard.jsx";

const Wrapper = styled.div`
  min-width: 250px;
`;

const ChartPieCustomer = () => {
  const { ordersData } = useDashboardContext();

  const series = Object.values(ORDER_STATUS).map((status) => {
    return ordersData.reduce((total, order) => {
      return total + (order.status === status ? 1 : 0);
    }, 0);
  });

  const labels = Object.keys(ORDER_STATUS).map((key) => {
    return ORDER_STATUS[key];
  });

  const options = {
    series: series,
    labels: labels,
    chart: {
      type: "donut",
    },
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
