import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import moment from "moment";
import Wrapper from "../assets/wrapper/blog/AllBlog";
import {
  List,
  Typography,
  Image,
  Breadcrumb,
  Button,
  Divider,
  Form,
  Card,
  Input,
  Radio,
  Select,
} from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

const RefundOrder = () => {
  const order = useLoaderData();
  const navigate = useNavigate();

  const { Title } = Typography;
  const { Option } = Select;

  const onFinish = async (values) => {
    try {
      const response = await customFetch.post(
        `/order/refund/${order._id}`,
        values
      );

      if (response) {
        toast.success("Hoàn tiền thành công");
        navigate("/edit-order/" + order._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    vnpTxnRef: order.vnpTxnRef,
    tototalAmount: order.totalAmount,
    transactionDate: order.vnpTransactionDate,
    CreateBy: "NovaStore",
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a onClick={() => navigate("/order")}>Order</a>,
            },
            {
              title: (
                <a onClick={() => navigate("/edit-order/" + order._id)}>
                  Order Detail
                </a>
              ),
            },
            {
              title: "Refund",
            },
          ]}
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>Refund Order</title>
        </Helmet>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Card style={{ width: 600 }}>
            <Title level={3}>{`Refund order #${order._id}`}</Title>
            <Form
              name="yourForm"
              initialValues={initialValues}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="vnpTxnRef"
                label="Mã giao dịch (vnp_TxnRef):"
                rules={[{ required: true, message: "Please input vnp_TxnRef" }]}
              >
                <Input placeholder="vd:123456" size="large" disabled={true} />
              </Form.Item>

              <Form.Item
                name="tototalAmount"
                label="Số tiền hoàn:"
                rules={[
                  { required: true, message: "Please input tototalAmount" },
                ]}
              >
                <Input placeholder="vd:2100000" size="large" />
              </Form.Item>

              <Form.Item
                name="transactionType"
                label="Kiểu hoàn tiền (vnp_TransactionType):"
                rules={[
                  {
                    required: true,
                    message: "Please select vnp_TransactionType!",
                  },
                ]}
              >
                <Select placeholder="Select tpye" size="large">
                  <Option value="02">Hoàn toàn phần</Option>
                  <Option value="03">Hoàn một phần</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="transactionDate"
                label="Thời gian tạo giao dịch (vnp_TransactionDate)"
                rules={[
                  {
                    required: true,
                    message: "Please input vnp_TransactionDate",
                  },
                ]}
              >
                <Input
                  placeholder="type: yyyymmddHHmmss"
                  size="large"
                  disabled={true}
                />
              </Form.Item>

              <Form.Item
                name="CreateBy"
                label="User thực hiện hoàn (vnp_CreateBy))"
                rules={[
                  { required: true, message: "Please input vnp_CreateBy" },
                ]}
              >
                <Input placeholder="" size="large" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block size="large">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default RefundOrder;
