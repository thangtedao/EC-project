import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData, Form } from "react-router-dom";
import { Space, Table } from "antd";

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .ed-btn {
    color: #035ecf;
    :hover {
      color: #a80000;
    }
  }

  .filter-bar {
    width: 80%;
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1rem;
  }
  .form-filter {
    width: fit-content;
    display: flex;
    gap: 0.3rem;

    .form-filter-label {
      display: grid;
      place-items: center;
      height: 30px;
      font-size: 0.9rem;
      font-weight: bold;
      color: #00193b;
    }
    .form-filter-select {
      height: 30px;
      border: 1px solid #e2e1e1;
      border-radius: 8px;
    }
  }
  .btn {
    width: 75px;
    height: 28px;
    border-radius: 10px;
    background-color: #035ecf;
    color: white;
    font-weight: bolder;
  }

  .grid-center {
    display: grid;
    place-items: center;
  }
  .ed-btn {
    border: 1px solid #035ecf;
    border-radius: 3px;
    padding: 0 5px;
    color: #035ecf;
  }
  .md-font {
    font-size: 0.95rem;
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

const AllOrder = () => {
  const { orders, params } = useLoaderData();
  const navigate = useNavigate();

  console.log(orders);

  const columns = [
    {
      title: "Customer",
      dataIndex: "orderBy",
      key: "orderBy",
      width: 250,
      render: (_, { orderBy }) => (
        <span className="md-font">{orderBy.fullName}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <span className="md-font">{createdAt.split("T")[0]}</span>
      ),
    },
    {
      title: "Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, { createdAt }) => (
        <span className="md-font">{createdAt.split("T")[1].split(".")[0]}</span>
      ),
    },
    {
      title: "Items",
      dataIndex: "products",
      key: "products",
      render: (_, { products }) => (
        <span className="md-font">{products.length}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (text) => <span className="md-font">{text}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="ed-btn grid-center"
            onClick={() => navigate(`/edit-order/${record._id}`)}
          >
            View
          </a>
        </Space>
      ),
    },
  ];

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order</title>
        </Helmet>

        <div className="title">Order</div>

        <Form className="filter-bar">
          <div className="form-filter">
            <label htmlFor="category" className="form-filter-label">
              Date
            </label>
            <select
              name="date"
              className="form-filter-select"
              defaultValue={params.date || "new"}
            >
              <option value="new">Mới nhất</option>
              <option value="old">Cũ nhất</option>
            </select>
          </div>

          <div className="form-filter">
            <label htmlFor="status" className="form-filter-label">
              Status
            </label>
            <select
              name="status"
              className="form-filter-select"
              defaultValue={params.status || "all"}
            >
              <option value="all">Tất cả</option>
              <option value="Chờ Xác Nhận">Chờ Xác Nhận</option>
              <option value="Đang Xử Lý">Đang Xử Lý</option>
              <option value="Đang Giao Hàng">Đang Giao Hàng</option>
              <option value="Đã Giao Hàng">Đã Giao Hàng</option>
              <option value="Đã Hủy">Đã Hủy</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Apply
          </button>
        </Form>

        <div style={{ width: "80%" }}>
          <Table columns={columns} dataSource={orders} size="middle" />
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllOrder;
