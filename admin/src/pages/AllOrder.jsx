import React, { useEffect, useState } from "react";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect, ProductCard } from "../components";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  gap: 2rem;
  padding: 1rem;
  .order-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
    <Wrapper>
      {orders.map((order) => {
        return (
          <div key={order._id} className="order-list">
            <span>Người đặt hàng: {order.orderBy.fullName}</span>
            <span>Ngày đặt hàng: {order.createdAt}</span>
            <span>Số lượng sản phẩm: {order.products.length}</span>
            <span>Trạng thái đơn hàng: {order.orderStatus}</span>
            <button onClick={() => navigate(`/edit-order/${order._id}`)}>
              Xem chi tiết
            </button>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default AllOrder;
