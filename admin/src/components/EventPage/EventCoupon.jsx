import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Card,
  Typography,
  Input,
  Select,
  InputNumber,
  Space,
  Button,
} from "antd";

const Wrapper = styled.div`
  width: 100%;

  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
    text-align: left;
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
  .discount {
    display: flex;
  }
  .discount-item-1 {
    flex-grow: 7;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .discount-item-2 {
    flex-grow: 3;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .ant-card-head-title {
    text-align: left;
  }
`;
function EventCoupon() {
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <HelmetProvider>
      <Wrapper>
        <Form name="basic">
          <Form.List name="variations">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    // align="baseline"
                    style={{
                      width: "100%",
                      display: "grid",
                      gridTemplateColumns: "1fr 0",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "1.5rem",
                        marginBottom: "4rem",
                      }}
                    >
                      <div
                        className="col-1"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
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
                                      size="large"
                                      placeholder="Enter Coupon Code"
                                    />
                                  </Form.Item>
                                </div>

                                <div className="discount-item-2">
                                  <Typography.Title className="input-title">
                                    Discount
                                  </Typography.Title>
                                  <Form.Item name="discountValue">
                                    <InputNumber
                                      suffix="%"
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
                                    minRows: 2,
                                    maxRows: 3,
                                  }}
                                />
                              </Form.Item>
                            </div>
                          </div>
                        </Card>
                      </div>
                      <div
                        className="col-2"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <Card
                          className="col-2-item"
                          size="large"
                          title={`Apply For`}
                        >
                          <Typography.Title className="input-title">
                            Select rank
                          </Typography.Title>
                          <Form.Item name="rank">
                            <Select
                              size="large"
                              allowClear
                              // placeholder="Select Rank"
                              // options=
                            />
                          </Form.Item>
                        </Card>
                      </div>
                    </div>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add another option
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
}

export default EventCoupon;
