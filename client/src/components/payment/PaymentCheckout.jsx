import React, { useState } from "react";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PayPalButton } from "../../components";
import { VnPayButton } from "../../components";
import PaymentProduct2 from "./PaymentProduct2.jsx";
import { CreditCardOutlined } from "@ant-design/icons";

import {
  Form,
  Card,
  Typography,
  Input,
  Select,
  Radio,
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
  .ant-card-head-title {
    text-align: left;
  }
  .info {
    display: flex;
    flex-direction: column;
  }

  .ant-typography {
    text-align: left;
    margin-bottom: 5px;
  }
  .radio-button {
    margin-bottom: 10px;
  }
  .ant-radio-button-wrapper:not(:first-child)::before {
    content: none; //Bỏ cái viền xanh xanh
  }
  .ant-radio-button-wrapper {
    line-height: "auto"; //chiều cao của button
  }
`;
const options = [
  {
    label: "Paypal",
    value: "Paypal",
    image:
      "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png",
  },
  {
    label: "VNPay",
    value: "VNPay",
    image:
      "https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png",
  },
];
const PaymentCheckout = ({
  cartItem,
  coupon,
  applyCoupon,
  totalAmount,
  paypalButtonKey,
}) => {
  const [code, setCode] = useState();
  //
  const [value3, setValue3] = useState("Apple");
  const onChange3 = ({ target: { value } }) => {
    console.log("radio3 checked", value);
    setValue3(value);
  };
  //
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
            <Card className="col-1-item" size="large" title={`Address`}>
              <div className="info">
                <Typography.Text>Nguyen Thanh Vy </Typography.Text>
                <Typography.Text>0123456789 </Typography.Text>
                <Typography.Text>abc@gmail.com </Typography.Text>
                <Typography.Text>89A, Siuuuuuu </Typography.Text>
                <Typography.Text>Long Hưng, Lap Vo</Typography.Text>
                <Typography.Text>LDong Thap, Viet Nam</Typography.Text>
              </div>
            </Card>
            <Card className="col-1-item" size="large" title={`Payment methods`}>
              {/* <Button
                type="primary"
                onClick={showModal}
                icon={<CreditCardOutlined />}
              >
                Choose Payment methods
              </Button> */}

              <div style={{ display: "flex", flexDirection: "column" }}>
                {options.map((option, index) => (
                  <Radio.Button
                    key={option.value}
                    onChange={onChange3}
                    value={option.value}
                    checked={value3 === option.value}
                    style={{
                      margin: "10px 0",
                      borderRadius: 0,
                      border: "1.5px solid #e04040",
                      height: "auto",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img width={70} src={option.image} alt={option.label} />
                      <span style={{ marginLeft: "10px" }}>{option.label}</span>
                    </div>
                  </Radio.Button>
                ))}
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
              <PaymentProduct2 />
            </Card>
          </div>
        </div>
        <PayPalButton
          key={paypalButtonKey}
          cartItem={cartItem}
          coupon={coupon}
          totalAmount={totalAmount}
        />
        <VnPayButton totalPrice={totalAmount} />
      </Wrapper>
    </HelmetProvider>
  );
};

export default PaymentCheckout;
