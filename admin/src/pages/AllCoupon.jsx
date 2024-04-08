import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";

import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Table, Button, Input, Dropdown } from "antd";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .title {
    width: 100%;
    text-align: left;
    font-size: 1.5rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .table {
    width: 100%;
  }
`;

export const loader = async () => {
  try {
    const coupons = await customFetch
      .get(`/coupon/all-coupons`)
      .then(({ data }) => data);
    return coupons;
  } catch (error) {
    return error;
  }
};

const AllCoupon = () => {
  const coupons = useLoaderData();
  const navigate = useNavigate();

  //Search Product
  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1677ff",
      }}
    />
  );

  //Dropdown
  const items = [
    {
      label: "View",
      key: "1",
      icon: <FormOutlined />,
    },
  ];

  const handleAddCoupon = () => {
    navigate("/add-coupon");
  };

  const handleEditCoupon = (id) => {
    navigate(`/edit-coupon/${id}`);
  };

  //Danh sách các cột
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Discount",
      dataIndex: "discountValue",
      key: "discountValue",
    },
    {
      title: "Day start",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate) => (
        <span className="md-font">{startDate?.split("T")[0]}</span>
      ),
    },
    {
      title: "Day start",
      dataIndex: "endDate",
      key: "endDate",

      render: (endDate) => (
        <span className="md-font">{endDate?.split("T")[0]}</span>
      ),
    },
    {
      title: "Used",
      dataIndex: "used",
      key: "used",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.sold - b.sold,
    },
    {
      title: "Action",
      key: "operation",
      width: 120,
      fixed: "right",
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditCoupon(_id)}
          menu={{
            items,
          }}
        >
          <EditOutlined />
          Edit
        </Dropdown.Button>
      ),
    },
  ];

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>All Coupon</title>
        </Helmet>

        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: "Coupon",
            },
          ]}
        />

        <div className="title">Coupon</div>

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Search
            size="large"
            placeholder="Enter search name"
            allowClear
            onSearch={onSearch}
            style={{
              width: "30%",
              minWidth: 300,
            }}
          />

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            style={{ width: 150 }}
            onClick={handleAddCoupon}
          >
            Add Coupon
          </Button>
        </div>

        <Table
          className="table"
          columns={columns}
          dataSource={coupons.map((coupon) => ({
            ...coupon,
            key: coupon._id,
          }))}
          onChange={onChange}
          scroll={{ x: 1200 }}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllCoupon;
