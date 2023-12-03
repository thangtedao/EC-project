import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ORDER_STATUS } from "../utils/constants.js";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { ProductBar } from "../components/index.js";
import { Form, redirect, useNavigation, useLoaderData } from "react-router-dom";

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
  .form-order {
    width: 600px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: aqua;
    box-shadow: 0px 3px 14px rgba(226, 225, 225, 0.75);
    border-color: #f1f1f1;
    border-radius: 10px;
    padding: 1rem;
  }

  .form-row {
    .form-label {
      font-size: 12px;
      font-weight: bold;
      color: #8d8d99;
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
    height: 50px;
    border-radius: 10px;
    background-color: #035ecf;
    color: white;
    font-size: 1.2rem;
    font-weight: bolder;
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

        <div className="title">Order Details</div>
        <Form method="post" className="form-order">
          <span>Ngày đặt hàng: {order.createdAt}</span>
          <span>Người đặt hàng: {order.orderBy.fullName}</span>
          <span>Số điện thoại: {order.orderBy.phone}</span>
          <span>Email: {order.orderBy.email}</span>
          <span>
            Địa chỉ:
            {order.orderBy.address &&
              `${order.orderBy.address.city}, ${order.orderBy.address.district}, ${order.orderBy.address.ward}, ${order.orderBy.address.home}`}
          </span>
          <span>Số lượng sản phẩm: {order.products.length}</span>
          <h5>Chi tiết sản phẩm:</h5>
          {order.products.map((item) => {
            return (
              <ProductBar
                key={item._id}
                product={{ ...item.product, count: item.count }}
              />
            );
          })}

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
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditOrder;
