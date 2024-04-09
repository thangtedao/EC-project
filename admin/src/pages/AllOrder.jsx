import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";
import { EditOutlined, AudioOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Tag, Table, Input, Dropdown } from "antd";

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

    const orders = await customFetch
      .get(`/order/`, { params })
      .then(({ data }) => data.orders);

    return { orders };
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

const AllOrder = () => {
  const { orders } = useLoaderData();
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
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
    },
    {
      title: "Image",
      width: 120,
      dataIndex: "images",
      key: "images",
      fixed: "left",
      // render: (images) => <Image width={100} height={100} src={images[0]} />,
    },
    {
      title: "Customer",
      width: 150,
      dataIndex: "user",
      key: "user",
      fixed: "left",
    },

    {
      title: "TotalAmount",
      dataIndex: "TotalAmount",
      key: "TotalAmount",
      width: 150,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
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
      width: 150,
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
  //Search
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order</title>
        </Helmet>

        <Breadcrumb
          style={{ paddingBottom: "1rem" }}
          items={[
            {
              title: <a href="/">Dashboard</a>,
            },
            {
              title: "Order",
            },
          ]}
        />

        <div className="title">Order</div>

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
          pagination={paginationConfig}
          columns={columns}
          dataSource={data}
          // dataSource={products.map((product) => ({
          //   ...product,
          //   key: product._id,
          // }))}
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

export default AllOrder;
