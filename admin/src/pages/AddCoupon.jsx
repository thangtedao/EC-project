import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import {
  Modal,
  Button,
  Form,
  Select,
  Input,
  Typography,
  Card,
  Breadcrumb,
  DatePicker,
  InputNumber,
} from "antd";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/coupon", data);
    return redirect("/all-coupon");
  } catch (error) {
    return error;
  }
};

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
  .discount {
    display: flex;
    gap: 10px;
  }
  .discount-item-1 {
    flex-grow: 5;
    box-sizing: border-box;
  }
  .discount-item-2 {
    flex-grow: 2;
    box-sizing: border-box;
  }
  .discount-item-3 {
    flex-grow: 3;
    box-sizing: border-box;
  }
`;

const AddCoupon = () => {
  const [discountType, setDiscountType] = useState("percentage");

  //Modal
  const [open, setModalOpen] = useState(false);
  //Mở Modal (Confirm box)
  const showModal = () => {
    setModalOpen(true);
  };
  //Đóng Modal sau khi xác nhận
  const handleOk = () => {
    setModalOpen(false);
  };
  //Đóng Modal sau khi xác nhận
  //Đóng ReviewOpen sau khi xác nhận
  const handleCancel = () => {
    setModalOpen(false);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const onFinish = async (values) => {
    values.startDate = values.startDate.toISOString();
    values.endDate = values.endDate.toISOString();
    console.log(values);
    const response = await customFetch.post("/coupon/create", values);
    if (response) navigate("/all-coupon");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: <a href="/all-coupon">Coupon</a>,
            },
            {
              title: "Add Coupon",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Add Coupon</title>
        </Helmet>
        <div className="title">Add Coupon</div>

        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <div style={{ display: "flex", gap: "1.5rem", marginBottom: "4rem" }}>
            <div
              className="col-1"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card
                className="col-1-item"
                size="large"
                title={`Coupon information`}
              >
                <div>
                  {/* INFORMATION FIELDS */}
                  <div>
                    <Typography.Title className="input-title">
                      Name
                    </Typography.Title>
                    <Form.Item name="name">
                      <Input
                        required
                        size="large"
                        placeholder="Enter Coupon Name"
                      />
                    </Form.Item>

                    <div className="discount">
                      <div className="discount-item-1">
                        <Typography.Title className="input-title">
                          Code
                        </Typography.Title>
                        <Form.Item name="code">
                          <Input
                            required
                            size="large"
                            placeholder="Enter Coupon Code"
                          />
                        </Form.Item>
                      </div>

                      <div className="discount-item-2">
                        <Typography.Title className="input-title">
                          Type
                        </Typography.Title>
                        <Form.Item
                          name="discountType"
                          rules={[
                            {
                              required: true,
                              message: "Please select disount type",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder="Select option"
                            value={discountType}
                            onChange={(value) => setDiscountType(value)}
                            options={[
                              {
                                value: "percentage",
                                label: "Percentage",
                              },
                              {
                                value: "fixed",
                                label: "Fixed",
                              },
                            ]}
                          />
                        </Form.Item>
                      </div>

                      <div className="discount-item-3">
                        <Typography.Title className="input-title">
                          Discount
                        </Typography.Title>
                        <Form.Item name="discountValue">
                          <InputNumber
                            required
                            suffix={discountType === "percentage" ? "%" : "VND"}
                            style={{ width: "100%" }}
                            size="large"
                            placeholder="eg. 10"
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <Typography.Title className="input-title">
                      Description
                    </Typography.Title>
                    <Form.Item name="description">
                      <Input.TextArea
                        size="large"
                        placeholder="Type your description..."
                        autoSize={{
                          minRows: 7,
                          maxRows: 9,
                        }}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Card>
            </div>

            <div
              className="col-2"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <Card className="col-2-item" size="large" title={`Day`}>
                <Typography.Title className="input-title">
                  Day Start
                </Typography.Title>
                <Form.Item name="startDate">
                  <DatePicker
                    required
                    size="large"
                    style={{ width: "100%" }}
                    onChange={onChange}
                    needConfirm
                  />
                </Form.Item>

                <Typography.Title className="input-title">
                  Day End
                </Typography.Title>
                <Form.Item name="endDate">
                  <DatePicker
                    required
                    size="large"
                    style={{ width: "100%" }}
                    onChange={onChange}
                    needConfirm
                  />
                </Form.Item>
              </Card>
            </div>
          </div>

          {/* BUTTON SUBMIT */}
          <div className="btn">
            <Button
              danger
              size="large"
              onClick={() => {
                Modal.confirm({
                  title: "Confirm",
                  content: "Do you want to cancel?",
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
            >
              Cancel
            </Button>

            <Button size="large" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AddCoupon;
