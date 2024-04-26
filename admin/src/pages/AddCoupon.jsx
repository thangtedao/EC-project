import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/coupon/AddCoupon.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
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
import { useNavigate } from "react-router-dom";

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

const AddCoupon = () => {
  const [discountType, setDiscountType] = useState("percentage");
  const navigate = useNavigate();

  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD";

  const { RangePicker } = DatePicker;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateRangeChange = (dates) => {
    if (dates) {
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  };

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
    try {
      values.startDate = startDate.format(dateFormat);
      values.endDate = endDate.format(dateFormat);
      const response = await customFetch.post("/coupon/create", values);
      if (response) navigate("/all-coupon");
    } catch (error) {
      return;
    }
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
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: <a onClick={() => navigate("/all-coupon")}>Coupon</a>,
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

                    <div className="customer">
                      <div className="customer-item-1">
                        <Typography.Title className="input-title">
                          Customer
                        </Typography.Title>
                        <Form.Item
                          name="targetCustomers"
                          rules={[
                            {
                              required: true,
                              message: "Please select target customer",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder="Target Customer"
                            value={discountType}
                            onChange={(value) => setDiscountType(value)}
                            options={[
                              {
                                value: "member",
                                label: "Member",
                              },
                              {
                                value: "silver",
                                label: "Silver",
                              },
                              {
                                value: "gold",
                                label: "Gold",
                              },
                              {
                                value: "diamond",
                                label: "Diamond",
                              },
                            ]}
                          />
                        </Form.Item>
                      </div>
                      <div className="customer-item-2">
                        <Typography.Title className="input-title">
                          Number of usage
                        </Typography.Title>
                        <Form.Item name="numberOfUses">
                          <InputNumber
                            required
                            size="large"
                            placeholder="Enter Number"
                          />
                        </Form.Item>
                      </div>
                    </div>

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
                            placeholder="Discount Type"
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
                  Date
                </Typography.Title>
                <RangePicker
                  required
                  value={[startDate, endDate]}
                  size="large"
                  onChange={handleDateRangeChange}
                />
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
