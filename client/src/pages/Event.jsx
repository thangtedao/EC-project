import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
// import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import Logo from "../assets/logo/NovaCoupon.svg";

import {
  Modal,
  Button,
  Form,
  Select,
  Input,
  Typography,
  Card,
  Breadcrumb,
  Avatar,
  List,
  Anchor,
  Col,
  Row,
} from "antd";

const Wrapper = styled.div`
  width: 80%;
  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 5rem;
    font-weight: 1000;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
  .col-2-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .col-1-item {
    border: 1px solid lightgray;
    border-radius: 10px;
  }
  .list-coupon {
    width: 90%;
    margin: 0 auto;
  }
  .col-title {
    position: fixed;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
  }
  .anchor-item {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 80px;
    margin-bottom: 8px;
    width: 100%;
    height: 40px;
  }

  .ant-anchor-link-title {
    padding-right: 10px;
  }
`;
const data = [
  {
    title: "SALE10",
    description: "Giảm 10% tất cả đơn hàng",
    dateT: "15/6/2024",
    dateE: "20/6/2024",
  },
  {
    title: "SALE5",
    description: "Giảm 5% tất cả đơn hàng",
  },
  {
    title: "SALE15",
    description: "Giảm 15% tất cả đơn hàng",
  },
  {
    title: "MAHDSNAUSG",
    description: "Giảm 20% tất cả đơn hàng",
  },
];
const Event = () => {
  const { Search } = Input;
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <HelmetProvider>
      <Wrapper>
        <Breadcrumb
          style={{ paddingBottom: "1rem", paddingTop: "1rem" }}
          items={[
            {
              title: <a onClick={() => navigate("/")}>Home</a>,
            },
            {
              title: "Coupon",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Coupon</title>
        </Helmet>
        <div className="title">Coupon</div>
        <div style={{ width: "30%", margin: "0 auto", marginBottom: "20px" }}>
          <Search
            placeholder="Search coupon"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Row>
            <Col span={21}>
              <div
                id="part-1"
                style={{
                  height: "100vh",

                  background: "rgba(255,0,0,0.02)",
                }}
              >
                <div className="list-coupon">
                  <Typography.Title className="input-title" strong>
                    All Coupon
                  </Typography.Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                      <List.Item
                        actions={[
                          <a key="list-loadmore-edit">View</a>,
                          <a key="list-loadmore-more">Copy</a>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={Logo} />}
                          title={<a>{item.title}</a>}
                          description={
                            <div>
                              <a>{item.description}</a>
                              <div>
                                {item.dateT}-{item.dateE}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
              <div
                id="part-2"
                style={{ height: "100vh", background: "rgba(0,255,0,0.02)" }}
              >
                <div className="list-coupon">
                  <Typography.Title className="input-title" strong>
                    New Coupon
                  </Typography.Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                      <List.Item
                        actions={[
                          <a key="list-loadmore-edit">View</a>,
                          <a key="list-loadmore-more">Copy</a>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={Logo} />}
                          title={<a>{item.title}</a>}
                          description={
                            <div>
                              <a>{item.description}</a>
                              <div>
                                {item.dateT}-{item.dateE}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>

              <div
                id="part-3"
                style={{ height: "100vh", background: "rgba(0,0,255,0.02)" }}
              >
                <div className="list-coupon">
                  <Typography.Title className="input-title" strong>
                    GOLD Coupon
                  </Typography.Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                      <List.Item
                        actions={[
                          <a key="list-loadmore-edit">View</a>,
                          <a key="list-loadmore-more">Copy</a>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={Logo} />}
                          title={<a>{item.title}</a>}
                          description={
                            <div>
                              <a>{item.description}</a>
                              <div>
                                {item.dateT}-{item.dateE}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
              <div
                id="part-4"
                style={{
                  height: "100vh",
                  background: "rgba(255, 50, 221, 0.02)",
                }}
              >
                <div className="list-coupon">
                  <Typography.Title className="input-title" strong>
                    DIA Coupon
                  </Typography.Title>
                  <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item, index) => (
                      <List.Item
                        actions={[
                          <a key="list-loadmore-edit">View</a>,
                          <a key="list-loadmore-more">Copy</a>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<Avatar src={Logo} />}
                          title={<a>{item.title}</a>}
                          description={
                            <div>
                              <a>{item.description}</a>
                              <div>
                                {item.dateT}-{item.dateE}
                              </div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col span={3} className="col-title">
              <Anchor
                items={[
                  {
                    key: "part-1",
                    href: "#part-1",
                    title: "All coupon",
                    className: "anchor-item",
                  },
                  {
                    key: "part-2",
                    href: "#part-2",
                    title: "New Coupon",
                    className: "anchor-item",
                  },
                  {
                    key: "part-3",
                    href: "#part-3",
                    title: "GOLD Coupon",
                    className: "anchor-item",
                  },
                  {
                    key: "part-4",
                    href: "#part-4",
                    title: "DIA Coupon",
                    className: "anchor-item",
                  },
                ]}
              />
            </Col>
          </Row>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Event;
