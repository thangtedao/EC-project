import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
// import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { redirect, useNavigation, useLoaderData } from "react-router-dom";

import {
  Button,
  Form,
  Typography,
  Card,
  Input,
  Divider,
  Image,
  List,
  Badge,
} from "antd";

const Wrapper = styled.div`
  width: 100%;

  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
  }
  .col-1 {
    width: 60%;
    height: fit-content;
  }
  .col-2 {
    width: 40%;
    height: fit-content;
  }
`;
export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/order/update/${id}`, data);
    return redirect("/all-order");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    if (!id) {
      return redirect("/all-order");
    }
    const order = await customFetch
      .get(`/order/${id}`)
      .then(({ data }) => data.order);
    return order;
  } catch (error) {
    return error;
  }
};

const PaymentProduct2 = () => {
  // const order = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = [
    {
      title: "SAMSUNG GALAXY ULTRAHD 15",
      color: "Red",
      spec: "8GB - 128 GB",
      price: "30.000.000 VND",
      tprice: "60.000.000 VND",
    },
    {
      title: "SAMSUNG GALAXY ULTRAHD 15",
      color: "Red",
      spec: "8GB - 128 GB",
      price: "3.000.000 VND",
      tprice: "60.000.000 VND",
    },
    {
      title: "SAMSUNG GALAXY ULTRAHD 15",
      color: "Red",
      spec: "8GB - 128 GB",
      price: "300 VND",
      tprice: "600 VND",
    },
  ];
  return (
    <HelmetProvider>
      <Wrapper>
        {/* <Form name="basic"> */}
        {/* <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            ></div>
            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            > */}
        {/* <Card size="large" title={`Product List`}> */}
        {/* LIST PRODUCT */}
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              style={{
                display: "grid",
                gridTemplateColumns: "6fr 2fr  2fr",
                // gridGap: "8px",
                alignItems: "center",
              }}
            >
              <div>
                <List.Item.Meta
                  avatar={
                    <Badge count={5}>
                      <Image
                        shape="square"
                        size="large"
                        width={70}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                      />
                    </Badge>
                  }
                  title={
                    <Typography.Text strong>
                      <a href="/">{item.title}</a>
                    </Typography.Text>
                  }
                  description={
                    <div>
                      <Typography.Text strong>Color: </Typography.Text>
                      {item.color}
                      <br />
                      <Typography.Text strong>Spec: </Typography.Text>
                      {item.spec}
                      <br />
                    </div>
                  }
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <Typography.Text strong>{item.price} </Typography.Text>{" "}
              </div>
              <div style={{ textAlign: "right" }}>
                <Typography.Text strong>{item.tprice} </Typography.Text>{" "}
              </div>
            </List.Item>
          )}
        />
        <Divider />
        {/* Coupon*/}
        <Typography.Title className="input-title">Coupon</Typography.Title>
        <Form.Item name="name">
          <Input size="large" disabled placeholder="SALE10" />
        </Form.Item>

        <Divider />
        {/* TOTAL PRICE 1 */}

        <div style={{ width: "60%", marginLeft: "auto", display: "flex" }}>
          <div style={{ width: "50%" }}>
            <Typography.Text size="large" strong>
              Subtotal:{" "}
            </Typography.Text>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Typography.Text size="large">{"đ"} 123459000</Typography.Text>
          </div>
        </div>
        {/* TOTAL PRICE 2 */}
        <div style={{ width: "60%", marginLeft: "auto", display: "flex" }}>
          <div style={{ width: "50%" }}>
            <Typography.Text size="large" strong>
              Coupon:{" "}
            </Typography.Text>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Typography.Text size="large">-{"đ"}1222222</Typography.Text>
          </div>
        </div>
        <Divider />
        {/* TOTAL PRICE 3 */}
        <div style={{ width: "60%", marginLeft: "auto", display: "flex" }}>
          <div style={{ width: "50%" }}>
            <Typography.Text size="large" strong>
              Amount paid:{" "}
            </Typography.Text>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Typography.Text size="large">{"đ"}1222200000</Typography.Text>
          </div>
        </div>
        {/* </Card> */}
        {/* </div>
          </div>{" "} */}
        {/* </Form> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default PaymentProduct2;
