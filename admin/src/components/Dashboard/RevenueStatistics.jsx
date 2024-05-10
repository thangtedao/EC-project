import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import {
  LaptopOutlined,
  DollarOutlined,
  SnippetsOutlined,
  UserOutlined,
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
                  Total Revenue
                </span>
              }
              value={
                totalRevenue?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
                "đ"
              }
              prefix={<DollarOutlined />}
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
