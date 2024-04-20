import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";
import { ORDER_STATUS } from "../../utils/constants.js";
import { useDashboardContext } from "../../pages/Dashboard";

const Wrapper = styled.div`
  min-width: 250px;
`;

const ChartPie = () => {
  const { orders } = useDashboardContext();

  // let series = [];
  // Object.keys(ORDER_STATUS).map((key) => {
  //   let numOfStatus = 0;
  //   orders.map((order) => {
  //     if (order.status === ORDER_STATUS[key]) numOfStatus++;
  //   });
  //   series.push(numOfStatus);
  // });

  const series = Object.values(ORDER_STATUS).map((status) => {
    return orders.reduce((total, order) => {
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

  const options2 = {
    series: [20, 20, 20, 20, 20],
    labels: ["Pending", "Processing", "Delivering", "Delivered", "Cancelled"],
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

      <Chart
        options={options2}
        series={options2.series}
        type="donut"
        width="100%"
        height="300px"
      />
    </Wrapper>
  );
};

export default ChartPie;
