import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import PaymentProduct from "./PaymentProduct.jsx";
import {
  Form,
  Card,
  Typography,
  Input,
  Select,
  InputNumber,
  Button,
  Modal,
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
  .input2 {
    display: flex;
  }
  .input2-item-1 {
    flex-grow: 5;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .input2-item-2 {
    flex-grow: 5;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .input2-item-3 {
    flex-grow: 9;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .input2-item-4 {
    flex-grow: 1;
    box-sizing: border-box;
    padding-left: 10px;
    display: flex;
    justify-content: center; /* Căn giữa theo chiều ngang */
    align-items: center;
  }
  .input3 {
    display: flex;
  }
  .input3-item-1 {
    flex-grow: 3;
    box-sizing: border-box;
    padding-right: 10px;
  }
  .input3-item-2 {
    flex-grow: 3;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .input3-item-3 {
    flex-grow: 4;
    box-sizing: border-box;
    padding-left: 10px;
  }
  .ant-card-head-title {
    text-align: left;
  }
`;
const PaymentInfo = ({ cartItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <HelmetProvider>
      <Wrapper>
        <Form name="basic">
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
                title={`Delivery details`}
              >
                <div>
                  {/* INFORMATION FIELDS */}
                  <div>
                    <Typography.Title className="input-title">
                      Customer Name
                    </Typography.Title>
                    <Form.Item name="name">
                      <Input size="large" placeholder="Enter Name" />
                    </Form.Item>

                    <div className="input2">
                      <div className="input2-item-1">
                        <Typography.Title className="input-title">
                          Email
                        </Typography.Title>
                        <Form.Item name="email">
                          <Input size="large" placeholder="Enter Email" />
                        </Form.Item>
                      </div>

                      <div className="input2-item-2">
                        <Typography.Title className="input-title">
                          Phone
                        </Typography.Title>
                        <Form.Item name="phone">
                          <InputNumber
                            style={{ width: "100%" }}
                            size="large"
                            placeholder="0123456789"
                          />
                        </Form.Item>
                      </div>
                    </div>
                    <div className="input2">
                      <div className="input2-item-3">
                        <Typography.Title className="input-title">
                          Address
                        </Typography.Title>
                        <Form.Item name="street">
                          <Input size="large" placeholder="52A, ấp bla bla" />
                        </Form.Item>
                      </div>
                      <div className="input2-item-4">
                        <Button
                          onClick={showModal}
                          icon={<PlusOutlined />}
                        ></Button>
                      </div>
                    </div>
                    {/* ADD Address */}
                    <Modal
                      title="Add Address"
                      open={isModalOpen}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      width={600}
                    >
                      <Typography.Title className="input-title">
                        Street
                      </Typography.Title>
                      <Form.Item name="street">
                        <Input size="large" placeholder="52A, ấp bla bla" />
                      </Form.Item>
                      <Typography.Title className="input-title">
                        Ward/Commune
                      </Typography.Title>
                      <Form.Item name="commune">
                        <Select
                          size="large"
                          allowClear
                          placeholder="Long Hưng A"
                          // options=
                        />
                      </Form.Item>
                      <Typography.Title className="input-title">
                        District
                      </Typography.Title>
                      <Form.Item name="district">
                        <Select
                          size="large"
                          allowClear
                          placeholder="Lấp Vò"
                          // options=
                        />
                      </Form.Item>

                      <Typography.Title className="input-title">
                        City/Province
                      </Typography.Title>
                      <Form.Item name="province">
                        <Select
                          size="large"
                          allowClear
                          placeholder="Đồng Tháp"
                          // options=
                        />
                      </Form.Item>
                    </Modal>
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
              <Card className="col-2-item" size="large" title={`Product List`}>
                <PaymentProduct />
              </Card>
            </div>
          </div>
        </Form>
      </Wrapper>
    </HelmetProvider>
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "1rem",
    //   }}
    // >
    //   {cartItem?.map((item, index) => {
    //     return (
    //       <div
    //         key={index}
    //         style={{
    //           width: "100%",
    //           height: 200,
    //           border: "1px solid black",
    //           display: "flex",
    //           flexDirection: "column",
    //         }}
    //       >
    //         <img
    //           style={{ width: 100 }}
    //           src={item?.product?.images[0]}
    //           alt="product image"
    //         />

    //         <NavLink
    //           to={`/product/${item?.product?._id}`}
    //           style={{ width: "70%" }}
    //         >
    //           {item?.product?.name}
    //         </NavLink>

    //         <div>
    //           {item.variant?.length > 0 &&
    //             item.variant.map((i) => {
    //               return <div key={i._id}>{i.variationValue}</div>;
    //             })}
    //         </div>

    //         <span>
    //           {(
    //             (item.variant?.reduce((a, i) => a + i.priceModifier, 0) +
    //               item.product.price) *
    //             item.quantity
    //           )
    //             .toString()
    //             .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    //           ₫
    //         </span>

    //         <span>
    //           {item?.product?.salePrice
    //             .toString()
    //             .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    //           ₫
    //         </span>

    //         <span className="strike">
    //           {item?.product?.price
    //             .toString()
    //             .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
    //           ₫
    //         </span>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default PaymentInfo;
