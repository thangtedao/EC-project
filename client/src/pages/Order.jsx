import React, { useEffect } from "react";
import styled from "styled-components";
import { OrderCard } from "../components";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch.js";

const Wrapper = styled.div`
  width: 650px;
  height: fit-content;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;

  .title {
    width: 100%;
    font-size: large;
    font-weight: bold;
    text-align: center;
  }
  .order-list {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .order-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .order-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }
  .product-item {
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 0.5rem 1rem;
    height: 120px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  .product-image {
    margin-left: 10px;
    width: 20%;
    img {
      width: 100%;
    }
  }
  .product-info {
    width: 40%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-info-name {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .main-price {
    color: #cf0000;
    display: flex;
    gap: 1rem;
    .strike {
      text-decoration: line-through;
    }
  }
  .order-status {
    border: 1px solid lightgray;
    background-color: #d1f5ea;
    padding: 0.5rem;
    width: 40%;
  }
  .normal-text {
    font-weight: 500;
    color: #4d4b4b;
  }
`;

export const loader = async () => {
  try {
    let { user } = JSON.parse(localStorage.getItem("persist:user"));

    if (user !== "null") {
      user = JSON.parse(user);
      const orders = await customFetch
        .get(`/order/?userId=${user._id}`)
        .then(({ data }) => data.orders);
      return orders;
    }
    return redirect("/login");
  } catch (error) {
    return error;
  }
};

const Order = () => {
  window.scrollTo(0, 0);
  const orders = useLoaderData();

  return (
    <Wrapper>
      <div className="title">Đơn hàng của bạn</div>
      <div className="order-list">
        {orders?.map((order) => {
          return <OrderCard key={order._id} order={order} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Order;
