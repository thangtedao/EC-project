import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData, Form } from "react-router-dom";

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

  table {
    background-color: white;
    width: 80%;
    margin-top: 1rem;
    border-collapse: collapse;
  }
  th {
    /* border: 1px solid lightgray; */
    height: 20px;
  }
  tr {
    border: 1px solid lightgray;
  }
  td {
    /* border: 1px solid lightgray; */
    height: 30px;
  }
  th,
  td {
    text-align: left;
    padding: 10px 20px;
  }

  th:last-child,
  td:last-child {
    width: 50px;
  }

  th:not(:last-child),
  td:not(:last-child) {
    width: 150px;
  }

  th:nth-last-child(3),
  td:nth-last-child(3) {
    width: 30px;
  }

  .status {
  }

  button {
    min-width: 80px;
    font-weight: bolder;
    background: white;
    border: none;
    height: 30px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
  }
  .ed-btn {
    border-bottom: 2px solid #035ecf;
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
  @media (max-width: 1550px) {
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
              {/* {categories.map((item) => {
                return (
                  <option key={item._id} value={item.slug}>
                    {item.name}
                  </option>
                );
              })} */}
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

        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Items</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.orderBy.fullName}</td>
                  <td>{order.createdAt.split("T")[0]}</td>
                  <td>{order.createdAt.split("T")[1].split(".")[0]}</td>
                  <td>
                    {order.products.reduce((acc, item) => acc + item.count, 0)}
                  </td>
                  <td>
                    <div className="status">{order.orderStatus}</div>
                  </td>
                  <td>
                    <button
                      className="ed-btn"
                      onClick={() => navigate(`/edit-order/${order._id}`)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Wrapper>
    </HelmetProvider>
  );
};

export default AllOrder;
