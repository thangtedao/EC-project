import React from "react";
import styled from "styled-components";
import { Line } from "@ant-design/charts";

const Wrapper = styled.div`
  /* margin: 64px 32px; */
`;

const data = [
  { day: "Mon", value: 3 },
  { day: "Tues", value: 4 },
  { day: "Wed", value: 3.5 },
  { day: "Thurs", value: 5 },
  { day: "Fri", value: 4.9 },
  { day: "Sat", value: 6 },
  { day: "Sun", value: 20 },
];
const config = {
  data,
  height: 400,
  xField: "day", // Đổi xField thành "value"
  yField: "value", // Đổi yField thành "day"
};
const ChartLine = () => {
  return (
    <Wrapper>
      <Line {...config} />
    </Wrapper>
  );
};

export default ChartLine;
