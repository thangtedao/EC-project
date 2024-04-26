import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import Wrapper from "../assets/wrapper/order/AllOrder.js";
import { useNavigate, useLoaderData } from "react-router-dom";
import { EditOutlined, AudioOutlined, FormOutlined } from "@ant-design/icons";
import { Breadcrumb, Tag, Table, Input, Dropdown } from "antd";
import { ORDER_STATUS } from "../utils/constants.js";

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    const orders = await customFetch.get(`/order/`).then(({ data }) => data);

    return { orders };
  } catch (error) {
    return error;
  }
};

const AllOrder = () => {
  const { orders } = useLoaderData();
  const navigate = useNavigate();

  const handleEditOrder = (id) => {
    navigate(`/edit-order/${id}`);
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

  //Danh sách các cột
  const columns = [
    {
      title: "ID Order",
      width: 120,
      dataIndex: "_id",
      key: "_id",
      fixed: "left",
      render: (_id) => "#" + _id.slice(18),
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
      render: (user) => user.fullName,
    },

    {
      title: "TotalAmount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      width: 150,
      render: (totalAmount) =>
        totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt.split("T")[0],
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => createdAt.split("T")[1].split(".")[0],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      render: (status) => {
        let color = "";
        if (status === "Cancelled") {
          color = "red";
        } else if (status === "Delivered") {
          color = "green";
        } else if (status === "Processing") {
          color = "orange";
        } else if (status === "Pending") {
          color = "gold";
        } else if (status === "Delivering") {
          color = "blue";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
      filters: Object.keys(ORDER_STATUS).map((key) => {
        return {
          text: ORDER_STATUS[key],
          value: ORDER_STATUS[key],
        };
      }),
      onFilter: (value, record) => record?.status === value,
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 150,
      render: ({ _id }) => (
        <Dropdown.Button
          onClick={() => handleEditOrder(_id)}
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
              title: <a onClick={() => navigate("/")}>Dashboard</a>,
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
          dataSource={orders.map((order) => ({
            ...order,
            key: order._id,
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

export default AllOrder;
