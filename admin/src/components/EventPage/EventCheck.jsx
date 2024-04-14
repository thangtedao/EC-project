import React, { useState } from "react";
import styled from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate, useLoaderData } from "react-router-dom";
import { AudioOutlined } from "@ant-design/icons";
import {
  Card,
  Table,
  Image,
  Button,
  Form,
  Input,
  Typography,
  Descriptions,
  Divider,
} from "antd";

const Wrapper = styled.div`
  width: 100%;
  .input-title {
    font-size: 0.95rem;
    font-weight: 400;
    text-align: left;
    font-weight: bold;
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
  .table {
    width: 100%;
  }
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
  }
  .ant-card-head-title {
    text-align: left;
  }
`;
const EventCheck = ({ products }) => {
  const navigate = useNavigate();

  //Danh sách các cột A
  const columns = [
    {
      title: "Image",
      width: 110,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      // render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // filters:
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      // filters:
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      // sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Price đã giảm",
      dataIndex: "price",
      key: "price",
      // sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      // sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // filters:
    },
    // {
    //   title: "Action",
    //   key: "operation",
    //   fixed: "right",
    //   width: 80,
    //   render: ({ _id }) => (
    //     <Button onClick={() => transferSelectedItems()}>Add</Button>
    //   ),
    // },
  ];
  //Data A
  const dataSource = [
    {
      key: "1",
      category: "1",
      name: "Mike",
      price: 32,
      sold: "10 Downing Street",
    },
    {
      key: "2",
      category: "2",
      name: "John",
      price: 42,
      sold: "10 Downing Street",
    },
  ];
  const columnsCoupon = [
    {
      title: "Name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      fixed: "left",
      // filters:
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      // filters:
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "Description",
      // sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Price đã giảm",
      dataIndex: "price",
      key: "price",
      // sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      // sorter: (a, b) => a.sold - b.sold,
    },
  ];
  //Data A
  const dataSourceCoupon = [
    {
      key: "1",
      category: "1",
      name: "Mike",
      rank: "gold",
      sold: "10%",
    },
    {
      key: "2",
      category: "2",
      name: "John",
      rank: "dia",
      sold: "20%",
    },
  ];
  const items = [
    {
      key: "1",
      label: "Name",
      children: "Tết sale sập shop",
    },
    {
      key: "2",
      label: "Description",
      children: "Bán cho vui ko cần lãi",
    },
    {
      key: "3",
      label: "Discount",
      children: "10%",
    },
    {
      key: "4",
      label: "Day Start",
      children: "30/02/2024",
    },

    {
      key: "5",
      label: "Day End",
      children: "31/02/2024",
    },
    {
      key: "6",
      label: "Image",
      children: "Image",
    },
  ];

  return (
    <HelmetProvider>
      <Wrapper>
        <Card>
          <Descriptions
            title="Event Check"
            // layout="vertical"
            size="large"
            column={1}
          >
            {items.map((item) => (
              <React.Fragment key={item.key}>
                <Descriptions.Item label={item.label}>
                  {item.children}
                </Descriptions.Item>
                <Divider />
              </React.Fragment>
            ))}
          </Descriptions>
          <Typography.Title className="input-title">Coupon:</Typography.Title>
          <Table
            className="table"
            columns={columnsCoupon}
            dataSource={dataSourceCoupon}
            scroll={{ x: 1200 }}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
          <Typography.Title className="input-title">Product:</Typography.Title>
          <Table
            className="table"
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1200 }}
            showSorterTooltip={{ target: "sorter-icon" }}
          />
        </Card>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EventCheck;
