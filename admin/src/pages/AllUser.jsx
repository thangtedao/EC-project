import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/user/AllUser.js";
import { useNavigate, useLoaderData, Link } from "react-router-dom";

import { EditOutlined, AudioOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Table, Image, Input, Dropdown } from "antd";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const orders = await customFetch
      .get(`/order/?admin=true`)
      .then(({ data }) => data);

    const users = await customFetch
      .get("/user/admin/all-users")
      .then(({ data }) => data);

    return { users, orders };
  } catch (error) {
    console.log(error);
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
  const { users, orders } = useLoaderData();
  const navigate = useNavigate();

  // users.map((user) => {
  //   let numOfOrder = 0;
  //   let totalSpent = 0;
  //   orders.map((order) => {
  //     if (order.user._id === user._id) {
  //       numOfOrder++;
  //       totalSpent += order.totalAmount;
  //     }
  //   });
  //   user.numOfOrder = numOfOrder;
  //   user.totalSpent = totalSpent;
  // });

  users.forEach((user) => {
    const userOrders = orders.filter((order) => order.user.id === user._id);
    user.numOfOrder = userOrders.length;
    user.totalSpent = userOrders.reduce(
      (total, order) => total + order.totalAmount,
      0
    );
  });

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
      width: 90,
      fixed: "left",
      render: (avatar) => (
        <>
          {avatar ? (
            <Image width={45} src={avatar} />
          ) : (
            <Image
              width={45}
              src={
                "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              }
            />
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
      width: 150,
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      width: 150,
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      width: 150,
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Order",
      width: 80,
      dataIndex: "numOfOrder",
      key: "order",
    },
    {
      title: "Total spent",
      width: 150,
      dataIndex: "totalSpent",
      key: "spent",
      render: (totalSpent) =>
        totalSpent.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
    },
    {
      title: "Role",
      width: 80,
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Last Activity",
      dataIndex: "activity",
      key: "activity",
      width: 150,
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
          View
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
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
            },
            {
              title: "Customer",
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
