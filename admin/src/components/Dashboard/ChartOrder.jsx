import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Mgay 1",
    nhan: 10,
    huy: 1,
  },
  {
    name: "Ngay 2",
    nhan: 20,
    huy: 2,
  },
  {
    name: "Ngay 3",
    nhan: 5,
    huy: 3,
  },
  {
    name: "Page D",
    nhan: 6,
    huy: 1,
  },
  {
    name: "Page E",
    nhan: 10,
    huy: 6,
  },
  {
    name: "Page F",
    nhan: 4,
    huy: 1,
  },
  {
    name: "Ngay 7",
    nhan: 5,
    huy: 0,
  },
];

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952";

  render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          //   width={500}
          //   height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="huy"
            stroke="#db4242"
            activeDot={{ r: 8 }}
            label={{
              position: "top",
              value: "huy",
              fill: "#ff0000",
              dy: -5,
              fontSize: 15,
            }}
          />
          <Line
            type="monotone"
            dataKey="nhan"
            stroke="#00ff62"
            activeDot={{ r: 8 }}
            label={{
              position: "right",
              value: "Nhan",
              dy: -5,
              fill: "#4fa16d",
              fontSize: 15,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
