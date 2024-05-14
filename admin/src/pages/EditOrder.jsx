import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ORDER_STATUS } from "../utils/constants.js";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/order/EditOrder.js";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import {
  Button,
  Select,
  Avatar,
  Form,
  Typography,
  Card,
  Breadcrumb,
  Space,
  Divider,
  Tag,
  Image,
  List,
} from "antd";

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
    const { id } = params;
    if (!id) {
      return redirect("/all-order");
    }
    const order = await customFetch
      .get(`/order/${id}`)
      .then(({ data }) => data);
    return order;
  } catch (error) {
    return error;
  }
};

const EditOrder = () => {
  const order = useLoaderData();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const updatedOrder = await customFetch.patch(
        `/order/create-ghn-order/${order._id}`
      );
      if (updatedOrder) navigate(`/edit-order/${order._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = async () => {
    try {
      const { data } = await customFetch.patch(
        `/order/print-ghn-order/${order._id}`
      );
      if (data) window.open(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      const updatedOrder = await customFetch.patch(
        `/order/update/${order._id}`,
        { status: "Cancelled", isCancel: false }
      );
      if (updatedOrder) navigate(`/edit-order/${order._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinish = async (values) => {
    try {
      if (order.isCancel && values.status === "Cancelled")
        values.isCancel = false;
      const updatedOrder = await customFetch.patch(
        `/order/update/${order._id}`,
        values
      );
      if (updatedOrder) navigate(`/edit-order/${order._id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: <a onClick={() => navigate("/all-order")}>Order</a>,
            },
            {
              title: "Order Detail",
            },
          ]}
        />
        <div className="title">Order Detail</div>
        <Form
          name="basic"
          initialValues={{ status: order.status }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {/* CARD LIST PRODUCT */}
              <Card
                className="col-1-item"
                size="large"
                title={"#" + order?._id.slice(18) || "None"}
                extra={
                  order.createdAt.split("T")[1].split(".")[0] +
                    " " +
                    order.createdAt.split("T")[0] || "None"
                }
              >
                {/* LIST PRODUCT */}
                <List
                  itemLayout="horizontal"
                  dataSource={order.orderItem}
                  renderItem={(item, index) => (
                    <List.Item
                      style={{
                        display: "grid",
                        gridTemplateColumns: "5fr 2fr 1fr 2fr",
                        // gridGap: "8px",
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <List.Item.Meta
                          avatar={
                            <Image
                              width={70}
                              src={
                                item.product?.image ||
                                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                              }
                            />
                          }
                          title={
                            <Typography.Text
                              strong
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                navigate(`/detail-product/${item.product.id}`)
                              }
                            >
                              {item.product?.name}
                            </Typography.Text>
                          }
                          // description={
                          //   <div>
                          //     {item.variant?.map((i) => {
                          //       return (
                          //         <div key={i._id}>
                          //           <Typography.Text strong>
                          //             {i.name + ": "}
                          //           </Typography.Text>
                          //           {i.value}
                          //           <br />
                          //         </div>
                          //       );
                          //     })}
                          //   </div>
                          // }
                        />
                      </div>

                      <div style={{ textAlign: "center" }}>
                        <Typography.Text strong>
                          {item.priceAtOrder
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}
                        </Typography.Text>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <Typography.Text strong>
                          {"x" + item.quantity}
                        </Typography.Text>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* {order.discountAmount > 0 && (
                          <Typography.Text
                            strong
                            style={{ textDecoration: "line-through" }}
                          >
                            {(item.priceAtOrder * item.quantity)
                              ?.toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}
                          </Typography.Text>
                        )} */}
                        <Typography.Text strong>
                          {item.subtotal
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"}
                        </Typography.Text>
                      </div>
                    </List.Item>
                  )}
                />
                <Divider />
                {/* TOTAL PRICE 1 */}

                <div
                  style={{ width: "40%", marginLeft: "auto", display: "flex" }}
                >
                  <div style={{ width: "40%" }}>
                    <Typography.Text size="large" strong>
                      Total:
                    </Typography.Text>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Typography.Text size="large">
                      {(order.discountAmount + order.totalAmount)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      ₫
                    </Typography.Text>
                  </div>
                </div>

                {/* TOTAL PRICE 2 */}
                {order.discountAmount > 0 && (
                  <div
                    style={{
                      width: "40%",
                      marginLeft: "auto",
                      display: "flex",
                    }}
                  >
                    <div style={{ width: "40%" }}>
                      <Typography.Text size="large" strong>
                        Coupon:
                      </Typography.Text>
                    </div>
                    <div style={{ marginLeft: "auto" }}>
                      <Typography.Text size="large">
                        {"-" +
                          order.discountAmount
                            ?.toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        ₫
                      </Typography.Text>
                    </div>
                  </div>
                )}

                {/* TOTAL PRICE 3 */}
                <div
                  style={{ width: "40%", marginLeft: "auto", display: "flex" }}
                >
                  <div style={{ width: "40%" }}>
                    <Typography.Text size="large" strong>
                      Amount paid:
                    </Typography.Text>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <Typography.Text size="large">
                      {order.totalAmount
                        ?.toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                      ₫
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
                  <Avatar
                    size={64}
                    icon={<UserOutlined />}
                    src={
                      order.user?.avatar ||
                      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }
                  />
                  <Typography.Text
                    onClick={() => navigate(`/edit-user/${order.user?._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {order.user?.fullName}
                  </Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>ID:</Typography.Text>
                  <Typography.Text size="large">
                    {order.user?._id}
                  </Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Rank:</Typography.Text>
                  <Typography.Text>
                    {order.user?.rank?.toUpperCase()}
                  </Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Phone Number: </Typography.Text>
                  <Typography.Text size="large">
                    {order.user?.phone}
                  </Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Email: </Typography.Text>
                  <Typography.Text size="large">
                    {order.user?.email}
                  </Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Delivery Address: </Typography.Text>
                  <Typography.Text>{order.shippingAddress}</Typography.Text>
                </Space>

                <Divider />

                <Space wrap size={16}>
                  <Typography.Text strong>Status:</Typography.Text>
                  {(() => {
                    switch (order.status) {
                      case "Pending":
                        return (
                          <Tag color="gold" size="large">
                            Pending
                          </Tag>
                        );
                      case "Processing":
                        return (
                          <Tag color="orange" size="large">
                            Processing
                          </Tag>
                        );
                      case "Delivering":
                        return (
                          <Tag color="blue" size="large">
                            Delivering
                          </Tag>
                        );
                      case "Delivered":
                        return (
                          <Tag color="green" size="large">
                            Delivered
                          </Tag>
                        );
                      default:
                        return (
                          <Tag color="red" size="large">
                            Cancelled
                          </Tag>
                        );
                    }
                  })()}
                </Space>

                <Divider />

                {order.isCancel && (
                  <Space wrap size={16}>
                    <Typography.Text strong style={{ color: "red" }}>
                      Customer requests order cancellation for translation
                    </Typography.Text>
                  </Space>
                )}
              </Card>

              {order.status === "Pending" && !order.isCancel && (
                <Button onClick={handleConfirm} size="large">
                  Confirm Order
                </Button>
              )}

              {order.status === "Processing" && (
                <Button onClick={handlePrint} size="large">
                  Print Order
                </Button>
              )}

              {order.isCancel && (
                <Button onClick={handleCancel} danger size="large">
                  Cancel Order
                </Button>
              )}

              {!(order.status === "Cancelled") && (
                <Card
                  className="col-2-item"
                  size="large"
                  title={`Change Status`}
                >
                  {/* <Typography.Title className="input-title">
                  Change Status
                </Typography.Title> */}

                  <Form.Item name="status">
                    <Select
                      size="large"
                      placeholder="Select Status"
                      options={Object.keys(ORDER_STATUS).map((key) => ({
                        value: ORDER_STATUS[key],
                        label: ORDER_STATUS[key],
                      }))}
                    />
                  </Form.Item>
                </Card>
              )}
            </div>
          </div>
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
