import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ORDER_STATUS } from "../utils/constants.js";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { ProductBar } from "../components/index.js";
import { redirect, useNavigation, useLoaderData } from "react-router-dom";
import img from "../assets/react.svg";
// import Avatar from "@mui/material/Avatar";
import { UserOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  Modal,
  Upload,
  Button,
  Select,
  Avatar,
  Form,
  Input,
  Typography,
  InputNumber,
  Card,
  Breadcrumb,
  Space,
  Divider,
  Tag,
  Image,
} from "antd";

// const Wrapper = styled.div`
//   width: 100%;
//   height: 800px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   .title {
//     font-size: 2rem;
//     font-weight: bold;
//     color: #00193b;
//     margin-bottom: 1rem;
//   }
//   .order-container {
//     display: flex;
//     justify-content: center;
//     gap: 2rem;
//     width: 100%;
//     height: 100%;
//   }

//   .order-details {
//     width: 600px;
//     height: 730px;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     background-color: white;
//     box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
//       0 2px 6px 2px rgba(60, 64, 67, 0.15);
//     border-color: #f1f1f1;
//     border-radius: 10px;
//     padding: 1rem;
//   }
//   .product-list {
//     width: 100%;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     overflow: auto;
//   }

//   .form-row {
//     margin-top: 2rem;
//     .form-label {
//       font-size: 0.9rem;
//       color: #00193b;
//     }
//     .form-input {
//       border: 1px solid #e2e1e1;
//       border-radius: 8px;
//       padding: 0 20px;
//       height: 44px;
//     }
//     .form-select {
//       border: 1px solid #e2e1e1;
//       border-radius: 8px;
//       padding: 0 20px;
//       height: 44px;
//     }
//   }
//   .btn {
//     height: 30px;
//     border-radius: 10px;
//     background-color: #035ecf;
//     color: white;
//     font-size: 1.1rem;
//     font-weight: bolder;
//   }

//   .user-info-container {
//     width: 300px;
//     height: 100%;
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//   }
//   .user-info {
//     display: flex;
//     flex-direction: column;
//     padding: 1rem;
//     gap: 1.2rem;
//     border-radius: 5px;
//     background-color: white;
//     box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
//       0 2px 6px 2px rgba(60, 64, 67, 0.15);
//   }

//   .flex-column {
//     display: flex;
//     flex-direction: column;
//     gap: 10px;
//   }

//   .flex {
//     display: flex;
//     align-items: center;
//     text-transform: capitalize;
//     gap: 1rem;
//   }

//   .bold {
//     font-size: 1rem;
//     font-weight: bold;
//     color: #00193b;
//   }

//   .form-order {
//     width: 100%;
//     height: 200px;
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//   }
// `;
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
    width: 65%;
    height: fit-content;
  }
  .col-2 {
    width: 35%;
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
  .btn {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    background-color: #f3f3f3;
    padding: 1 rem;
    height: 60px;
    width: 350px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-typography {
    size: "large";
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

const EditOrder = () => {
  // const order = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order Details</title>
        </Helmet>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: <a href="/all-order">Order</a>,
            },
            {
              title: "Order Detail",
            },
          ]}
        />
        <div className="title">Order Detail</div>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Ở đây là ID Order`}
                extra={`Ngay2 tạo order ở đây`}
              >
                {/* PRODUCT 1 */}

                <div
                  className="product"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <Image
                    width={90}
                    height={90}
                    src="error"
                    fallback="data:image/png;base64,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"
                  />
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography.Text strong>
                      IPHONE 15 PROMAX ULTRA UNLIMITED
                    </Typography.Text>

                    <Space wrap size={8}>
                      <Typography.Text strong>Loại:</Typography.Text>
                      <Typography.Text size="large">8GB-126GB</Typography.Text>
                    </Space>
                    <Space wrap size={8}>
                      <Typography.Text strong>Color:</Typography.Text>
                      <Typography.Text size="large">Red</Typography.Text>
                    </Space>
                  </div>
                  <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                    }}
                  >
                    <Typography.Text strong>10.000.000</Typography.Text>
                  </div>
                  <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                    }}
                  >
                    <Typography.Text strong>X2</Typography.Text>
                  </div>
                  <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <Typography.Text strong>20.000.000</Typography.Text>
                  </div>
                </div>
                <Divider />
                {/* PRODUCT 2 */}
                <div
                  className="product"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                  }}
                >
                  <Image
                    width={90}
                    height={90}
                    src="error"
                    fallback="data:image/png;base64,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"
                  />
                  <div
                    style={{
                      width: "40%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography.Text strong>
                      IPHONE 15 PROMAX ULTRA UNLIMITED
                    </Typography.Text>

                    <Space wrap size={8}>
                      <Typography.Text strong>Loại:</Typography.Text>
                      <Typography.Text size="large">8GB-126GB</Typography.Text>
                    </Space>
                    <Space wrap size={8}>
                      <Typography.Text strong>Color:</Typography.Text>
                      <Typography.Text size="large">Red</Typography.Text>
                    </Space>
                  </div>
                  <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                    }}
                  >
                    <Typography.Text strong>10.000.000</Typography.Text>
                  </div>
                  <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                    }}
                  >
                    <Typography.Text strong>X2</Typography.Text>
                  </div>
                  <div
                    style={{
                      width: "15%",
                      textAlign: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <Typography.Text strong>20.000.000</Typography.Text>
                  </div>
                </div>
                <Divider />

                {/* TOTAL PRICE 1 */}

                <div
                  style={{ width: "40%", marginLeft: "auto", display: "flex" }}
                >
                  <div style={{ width: "40%" }}>
                    <Typography.Text size="large" strong>
                      Total:{" "}
                    </Typography.Text>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Typography.Text size="large">
                      {"đ"} 123456789000
                    </Typography.Text>
                  </div>
                </div>
                {/* TOTAL PRICE 2 */}
                <div
                  style={{ width: "40%", marginLeft: "auto", display: "flex" }}
                >
                  <div style={{ width: "40%" }}>
                    <Typography.Text size="large" strong>
                      Coupon:{" "}
                    </Typography.Text>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Typography.Text size="large">
                      -{"đ"}12222222
                    </Typography.Text>
                  </div>
                </div>

                {/* TOTAL PRICE 3 */}
                <div
                  style={{ width: "40%", marginLeft: "auto", display: "flex" }}
                >
                  <div style={{ width: "40%" }}>
                    <Typography.Text size="large" strong>
                      Amount paid::{" "}
                    </Typography.Text>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Typography.Text size="large">
                      {"đ"}122222220000000000
                    </Typography.Text>
                  </div>
                </div>
              </Card>
            </div>

            {/* CUSTOMER */}

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card className="col-2-item" size="large" title={`Customer`}>
                <Space wrap size={16}>
                  <Avatar size={64} icon={<UserOutlined />} />
                  <Typography.Text>Nguyen Thanh Vy</Typography.Text>
                </Space>

                <Divider />
                <Space wrap size={16}>
                  <Typography.Text strong>ID:</Typography.Text>
                  <Typography.Text size="large">125445824</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Phone Number: </Typography.Text>
                  <Typography.Text size="large">123456789</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Email: </Typography.Text>
                  <Typography.Text size="large">@email.com</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Delivery Address: </Typography.Text>
                  <Typography.Text>123</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Status: </Typography.Text>
                  <Tag color="red" size="large">
                    Cancelled
                  </Tag>
                  <Tag color="green" size="large">
                    Delivered
                  </Tag>
                  <Tag color="orange" size="large">
                    Processing
                  </Tag>
                  <Tag color="gold" size="large">
                    Pending
                  </Tag>
                  <Tag color="blue" size="large">
                    Shipped
                  </Tag>
                </Space>
              </Card>
              <Card className="col-2-item" size="large" title={`Change Status`}>
                <Typography.Title className="input-title">
                  Change Status
                </Typography.Title>
                <Form.Item name="parent">
                  <Select
                    size="large"
                    allowClear
                    placeholder="Select Status"
                    options={[
                      {
                        value: "OK",
                        label: "OK",
                      },
                    ]}
                  />
                </Form.Item>
              </Card>
            </div>
          </div>{" "}
          {/* BUTTON SUBMIT */}
          <div className="btn">
            <Button danger size="large">
              Cancel
            </Button>

            <Button
              size="large"
              type="primary"
              htmlType="submit"
              // onClick={() => {
              //   Modal.confirm({
              //     title: "Confirm",
              //     content: "Do you want submit?",
              //     footer: (_, { OkBtn, CancelBtn }) => (
              //       <>
              //         <CancelBtn />
              //         <OkBtn />
              //       </>
              //     ),
              //   });
              // }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditOrder;
