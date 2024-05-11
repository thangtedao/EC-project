import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    view: 590,
    buy: 800,
    rate: 10,
  },
  {
    name: "Page B",
    view: 868,
    buy: 967,
    rate: 2,
  },
  {
    name: "Page C",
    view: 1397,
    buy: 1098,
    rate: 4,
  },
  {
    name: "Page D",
    view: 1480,
    buy: 1200,
    rate: 16,
  },
  {
    name: "Page E",
    view: 1520,
    buy: 1108,
    rate: 6,
  },
  {
    name: "Page F",
    view: 1400,
    buy: 680,
    rate: 12,
  },
];
export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/simple-composed-chart-lyz572";

  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          //   width={500}
          //   height={400}
          data={data}
          margin={{
            top: 5,
            right: 20,
            bottom: 20,
            left: 5,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#122cef"
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick}%`}
          />
          <Tooltip />
          <Legend />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="rate"
            fill="#263dec"
            stroke="#1226bb"
            label={{
              position: "top",
              //   value: "Revenue",
              fill: "#121292",
              fontSize: 13,
              dy: -2,
              formatter: (value) => `${value}%`,
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="buy"
            fill="#29cb3e"
            stroke="#22b436"
            label={{
              position: "top",
              //   value: "Revenue",
              fill: "#147921",
              fontSize: 13,
              dy: -2,
            }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="view"
            stroke="#ff7300"
            label={{
              position: "top",
              //   value: "Revenue",
              fill: "#de6400",
              fontSize: 13,
              dy: -2,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
}
