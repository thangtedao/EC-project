import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../../utils/customFetch";
import styled from "styled-components";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import {
  EditOutlined,
  AudioOutlined,
  PlusOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Tag, Table, Image, Button, Input, Dropdown } from "antd";
const Wrapper = styled.div`
  width: 100%;

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
    const orders = await customFetch
      .get(`/order/`, { params })
      .then(({ data }) => data.orders);

    return { orders, params };
  } catch (error) {
    return error;
  }
};
//Dropdown
const items = [
  {
    label: "View",
    key: "1",
    icon: <FormOutlined />,
  },
];

const DashboardOrder = () => {
  const { orders, params } = useLoaderData();
  const navigate = useNavigate();

  console.log(orders);
  const handleEditOrder = () => {
    navigate("/edit-order/:id");
  };
  //Danh sách các cột
  const columns = [
    {
      title: "ID Order",
      width: 120,
      dataIndex: "id",
      key: "id",
      fixed: "left",
    },
    {
      title: "Customer",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (_, { status }) => (
        <>
          {status.map((tag) => {
            let color = "";

            if (tag === "Cancelled") {
              color = "red";
            } else if (tag === "Delivered") {
              color = "green";
            } else if (tag === "Processing") {
              color = "orange";
            } else if (tag === "Pending") {
              color = "gold";
            } else if (tag === "Shipped") {
              color = "blue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 120,
      render: () => (
        <Dropdown.Button
          onClick={handleEditOrder}
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
  const data = [
    {
      key: "1",
      name: "John Brown",

      status: ["Pending", "Processing"],
    },
    {
      key: "2",
      name: "Jim Green",

      status: ["Cancelled"],
    },
    {
      key: "3",
      name: "Joe Black",
      status: ["Shipped", "Delivered"],
    },
  ];
  // onChange của sorter và filter data cột
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  // Số lượng sản phẩm trên mỗi trang
  const paginationConfig = {
    pageSize: 5,
  };
  return (
    <HelmetProvider>
      <Wrapper>
        <Table
          className="table"
          // rowSelection={{
          //   type: selectionType,
          //   ...rowSelection,
          // }}
          pagination={paginationConfig}
          columns={columns}
          dataSource={data}
          // dataSource={products.map((product) => ({
          //   ...product,
          //   key: product._id,
          // }))}
          onChange={onChange}
          showSorterTooltip={{
            target: "sorter-icon",
          }}
        />
      </Wrapper>
    </HelmetProvider>
  );
};

export default DashboardOrder;
