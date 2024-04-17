import React from "react";
import styled from "styled-components";
import { Line } from "@ant-design/charts";
import { useDashboardContext } from "../../pages/Dashboard";

const Wrapper = styled.div`
  /* margin: 64px 32px; */
`;

const ChartLine = () => {
  const { selectType } = useDashboardContext();

  let data;

  switch (selectType) {
    case "Daily":
      data = [
        { day: "Mon", value: 3 },
        { day: "Tues", value: 4 },
        { day: "Wed", value: 3.5 },
        { day: "Thurs", value: 5 },
        { day: "Fri", value: 4.9 },
        { day: "Sat", value: 6 },
        { day: "Sun", value: 20 },
      ];
      break;

    case "Monthly":
      data = [
        { day: "T1", value: 3 },
        { day: "T2", value: 4 },
        { day: "T3", value: 3.5 },
        { day: "T4", value: 5 },
        { day: "T5", value: 4.9 },
        { day: "T6", value: 6 },
        { day: "T7", value: 20 },
        { day: "T8", value: 4 },
        { day: "T9", value: 3.5 },
        { day: "T10", value: 5 },
        { day: "T11", value: 4.9 },
        { day: "T12", value: 6 },
      ];
      break;

    default:
      data = [
        { day: "Mon", value: 3 },
        { day: "Tues", value: 0 },
        { day: "Wed", value: 0 },
        { day: "Thurs", value: 0 },
        { day: "Fri", value: 0 },
        { day: "Sat", value: 0 },
        { day: "Sun", value: 0 },
      ];
      break;
  }

  const config = {
    data,
    height: 400,
    xField: "day", // Đổi xField thành "value"
    yField: "value", // Đổi yField thành "day"
  };

  return (
    <Wrapper>
      <Line {...config} />
    </Wrapper>
  );
};

export default ChartLine;
