import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ORDER_STATUS } from "../utils/constants.js";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { ProductBar } from "../components/index.js";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";
import img from "../assets/react.svg";
import Avatar from "@mui/material/Avatar";

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }
  .order-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    width: 100%;
    height: 100%;
  }

  .order-details {
    width: 600px;
    height: 730px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    border-color: #f1f1f1;
    border-radius: 10px;
    padding: 1rem;
  }
  .product-list {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
  }

  .form-row {
    margin-top: 2rem;
    .form-label {
      font-size: 12px;
      font-weight: bold;
      color: #00193b;
    }
    .form-input {
      border: 1px solid #e2e1e1;
      border-radius: 8px;
      padding: 0 20px;
      height: 44px;
    }
    .form-select {
      border: 1px solid #e2e1e1;
      border-radius: 8px;
      padding: 0 20px;
      height: 44px;
    }
  }
  .btn {
    height: 30px;
    border-radius: 10px;
    background-color: #035ecf;
    color: white;
    font-size: 1.1rem;
    font-weight: bolder;
  }

  .user-info-container {
    width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1.2rem;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .flex {
    display: flex;
    align-items: center;
    text-transform: capitalize;
    gap: 1rem;
  }

  .bold {
    font-size: 1rem;
    font-weight: bold;
    color: #00193b;
  }

  .form-order {
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/order/update/${id}`, data);
    return redirect("/all-order");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-order");
    }
    const order = await customFetch
      .get(`/order/${id}`)
      .then(({ data }) => data.order);

    return order;
  } catch (error) {
    return error;
  }
};

const EditOrder = () => {
  const order = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order Details</title>
        </Helmet>

        <div className="title">Chi Tiết Đơn Hàng</div>
        <div className="order-container">
          <div className="order-details">
            <div className="flex">
              <div className="bold">Ngày đặt hàng: </div>
              {order.createdAt.split("T")[0] +
                "  " +
                order.createdAt.split("T")[1].split(".")[0]}
            </div>
            <div className="flex">
              <div className="bold">Số lượng sản phẩm: </div>
              {order.products.length}
            </div>
            <div className="flex">
              <div className="bold">Tổng tiền:</div>
              {order.totalPrice + "đ"}
            </div>

            <div className="bold">Chi tiết sản phẩm:</div>
            <div className="product-list">
              {order.products.map((item) => {
                return (
                  <ProductBar
                    key={item._id}
                    product={{ ...item.product, count: item.count }}
                  />
                );
              })}
            </div>
          </div>

          <div className="user-info-container">
            <div className="user-info">
              <div className="bold">Khách hàng</div>
              <div className="flex">
                <Avatar
                  sx={{
                    width: 37,
                    height: 37,
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                  }}
                  src={order?.orderBy?.avatar && order.orderBy.avatar}
                >
                  {!order?.orderBy?.avatar &&
                    order?.orderBy?.fullName.charAt(0).toUpperCase()}
                </Avatar>
                <div>{order.orderBy.fullName}</div>
              </div>
            </div>
            <div className="user-info">
              <div className="bold">Thông tin liên hệ</div>
              <div className="flex-column">
                <div>{order.orderBy.fullName}</div>
                <div>{order.orderBy.email}</div>
                <div>{order.orderBy.phone}</div>
              </div>
            </div>
            <div className="user-info">
              <div className="bold">Địa chỉ giao hàng</div>
              <div className="flex-column">
                <div>{order.orderBy.address.city}</div>
                <div>{order.orderBy.address.district}</div>
                <div>{order.orderBy.address.ward}</div>
                <div>{order.orderBy.address.home}</div>
              </div>
            </div>

            <div className="user-info">
              <Form method="post" className="form-order">
                <div className="form-row">
                  <label htmlFor="orderStatus" className="form-label">
                    Cập nhật trạng thái:
                  </label>
                  <select
                    className="form-select"
                    name="orderStatus"
                    defaultValue={order.orderStatus}
                  >
                    {ORDER_STATUS.map((item) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditOrder;
