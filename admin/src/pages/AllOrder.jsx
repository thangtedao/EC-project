import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { useNavigate, useLoaderData } from "react-router-dom";

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
  @media (max-width: 1550px) {
  }
`;

export const loader = async () => {
  try {
    const orders = await customFetch
      .get(`/order/`)
      .then(({ data }) => data.orders);
    return orders;
  } catch (error) {
    return error;
  }
};

const AllOrder = () => {
  const orders = useLoaderData();
  const navigate = useNavigate();

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order</title>
        </Helmet>

        <div className="title">Order</div>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order._id}>
                  <td>{order.orderBy.fullName}</td>
                  <td>{order.createdAt}</td>
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
