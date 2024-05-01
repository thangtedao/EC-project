import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Card,
  Table,
  Image,
  Form,
  Typography,
  Descriptions,
  Divider,
  Tag,
} from "antd";
import { PRODUCT_STATUS } from "../../utils/constants";

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
const EventCheck = ({
  name,
  description,
  discount,
  startDate,
  endDate,
  categories,
  selectedProducts,
}) => {
  dayjs.extend(customParseFormat);
  const dateFormat = "YYYY-MM-DD HH:mm:ss";

  //Danh sách các cột A
  const columns = [
    {
      title: "Image",
      width: 100,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      render: (images) => <Image width={80} height={80} src={images[0]} />,
    },
    {
      title: "Name",
      width: 250,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 150,
      render: (category) => {
        return category?.map((item) => <div key={item._id}>{item?.name}</div>);
      },
      filters: categories?.map((category) => {
        return {
          text: category?.name,
          value: category?._id,
        };
      }),
      onFilter: (value, record) =>
        record?.category?.some((cat) => cat?._id === value),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
    },
    {
      title: "Sale Price",
      dataIndex: "salePrice",
      key: "salePrice",
      width: 150,
      render: (value) =>
        value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (status) => {
        let color = "";
        if (status === "Available") {
          color = "green";
        } else if (status === "Out of stock") {
          color = "orange";
        } else if (status === "Discontinued") {
          color = "red";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: Object.keys(PRODUCT_STATUS).map((key) => {
        return {
          text: PRODUCT_STATUS[key],
          value: PRODUCT_STATUS[key],
        };
      }),
      onFilter: (value, record) => record?.status === value,
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      width: 100,
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
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

  return (
    <Wrapper>
      <Card>
        <Descriptions
          title="Event Check"
          // layout="vertical"
          size="large"
          column={1}
        >
          <React.Fragment>
            <Descriptions.Item label="Name">{name}</Descriptions.Item>
            <Divider />
          </React.Fragment>
          <React.Fragment>
            <Descriptions.Item label="Description">
              {description}
            </Descriptions.Item>
            <Divider />
          </React.Fragment>
          <React.Fragment>
            <Descriptions.Item label="Discount">{discount}</Descriptions.Item>
            <Divider />
          </React.Fragment>
          <React.Fragment>
            <Descriptions.Item label="Start Date">
              {startDate?.format(dateFormat)}
            </Descriptions.Item>
            <Divider />
          </React.Fragment>
          <React.Fragment>
            <Descriptions.Item label="End Date">
              {endDate?.format(dateFormat)}
            </Descriptions.Item>
            <Divider />
          </React.Fragment>
        </Descriptions>
        {/* <Typography.Title className="input-title">Coupon:</Typography.Title>
        <Table
          className="table"
          columns={columnsCoupon}
          dataSource={dataSourceCoupon}
          scroll={{ x: 1200 }}
          showSorterTooltip={{ target: "sorter-icon" }}
        /> */}
        <Typography.Title className="input-title">Product:</Typography.Title>
        <Table
          className="table"
          columns={columns}
          dataSource={selectedProducts.map((product) => ({
            ...product,
            key: product._id,
          }))}
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      </Card>
    </Wrapper>
  );
};

export default EventCheck;
