import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const Wrapper = styled.div``;

const ChartPie = () => {
  const options = {
    series: [20, 55, 13, 33, 20],
    labels: ["Pending", "Shipped", "Processing", "Cancelled", "Delivered"],
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

export default ChartPie;
