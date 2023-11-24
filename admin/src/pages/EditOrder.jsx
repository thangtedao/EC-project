import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ORDER_STATUS } from "../utils/constants.js";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { ProductBar } from "../components/index.js";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

const Wrapper = styled.div`
  .form-order {
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

        <Form method="post" className="form-order">
          <h4>Order Details</h4>
          <span>Ngày đặt hàng: {order.createdAt}</span>
          <span>Người đặt hàng: {order.orderBy.fullName}</span>
          <span>Số điện thoại: {order.orderBy.phone}</span>
          <span>Email: {order.orderBy.email}</span>
          <span>Địa chỉ: {order.orderBy.address}</span>
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

          <span>Cập nhật trạng thái:</span>
          <select name="orderStatus" defaultValue={order.orderStatus}>
            {ORDER_STATUS.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </Form>
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditOrder;
