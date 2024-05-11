import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  LaptopOutlined,
  DollarOutlined,
  SnippetsOutlined,
  UserOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const Wrapper = styled.div`
  .ant-statistic {
    margin-left: 20px;
    margin-bottom: 20px;
  }
`;
const RevenueStatistics = ({
  totalRevenue,
  totalProduct,
  totalOrder,
  totalUser,
}) => {
  let rate = 0;
  if (totalRevenue[1].totalRevenue > 0)
    rate =
      ((totalRevenue[0].totalRevenue - totalRevenue[1].totalRevenue) /
        totalRevenue[1].totalRevenue) *
      100;

  return (
    <Wrapper>
      <Row gutter={16}>
        <Col span={6}>
          <Card className="revenue-item">
            <Statistic
              title={
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: "18px",
                  }}
                >
                  Revenue{" "}
                  <span style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                    {"(Compare with last month)"}
                  </span>
                </span>
              }
              valueStyle={{
                color: rate > 0 ? "#3f8600" : "#cf1322",
              }}
              // value={
              //   totalRevenue[0].totalRevenue
              //     ?.toString()
              //     .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
              // }
              value={Math.abs(rate).toFixed(2)}
              // prefix={<DollarOutlined />}
              prefix={rate > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="revenue-item">
            <Statistic
              title={
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: "18px",
                  }}
                >
                  Total Products Sold
                </span>
              }
              value={totalProduct}
              prefix={<LaptopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="revenue-item">
            <Statistic
              title={
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: "18px",
                  }}
                >
                  Total Orders
                </span>
              }
              value={totalOrder}
              prefix={<SnippetsOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="revenue-item">
            <Statistic
              title={
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#000",
                    fontSize: "18px",
                  }}
                >
                  Total Users
                </span>
              }
              value={totalUser}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default RevenueStatistics;
