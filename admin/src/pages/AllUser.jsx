import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import img from "../assets/react.svg";

import { EditOutlined, AudioOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Image, Input, Dropdown } from "antd";

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
  .ant-table {
    border: 1px solid lightgray;
    border-radius: 2px;
  }
`;

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    // const orders = await customFetch
    //   .get(`/order/`)
    //   .then(({ data }) => data);

    const users = await customFetch
      .get("/user/admin/all-users")
      .then(({ data }) => data);

    return { users };
  } catch (error) {
    return error;
  }
};

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

const AllUser = () => {
  const { users } = useLoaderData();
  const navigate = useNavigate();

  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleEditUser = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "avatar",
      key: "avatar",
      width: 120,
      fixed: "left",
      render: (avatar) => (
        <>
          {avatar ? (
            <Image width={45} src={avatar} />
          ) : (
            <Image width={45} src={img} />
          )}
        </>
      ),
    },
    {
      title: "Name",
      width: 150,
      fixed: "left",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Order",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Total spent",
      dataIndex: "spent",
      key: "spent",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Last Activity",
      dataIndex: "activity",
      key: "activity",
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      width: 100,
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditUser(_id)}
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

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>User</title>
        </Helmet>

        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: "User",
            },
          ]}
        />

        <div className="title">User</div>

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
        </div>

        <Table
          className="table"
          columns={columns}
          dataSource={users?.map((user) => ({
            ...user,
            key: user._id,
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

export default AllUser;
