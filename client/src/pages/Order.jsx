import React, { useState } from "react";
import Wrapper from "../assets/wrappers/Order.js";
import { OrderItem } from "../components";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";
import { debounce } from "lodash";
import { Tabs, Tab, Box } from "@mui/material";
import { ORDER_STATUS } from "../utils/constants.js";

export const loader = async () => {
  try {
    window.scrollTo(0, 0);
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    if (user) {
      const ordersData = await customFetch
        .get(`/order/?user=${user._id}&status=Pending`)
        .then(({ data }) => data);
      return { user, ordersData };
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const Order = () => {
  const { user, ordersData } = useLoaderData();
  const navigate = useNavigate();

  const [value, setValue] = useState(ORDER_STATUS.PENDING);
  const [orders, setOrders] = useState(ordersData);

  const cancelOrder = debounce(async (id, isCancel) => {
    try {
      const cancelOrder = await customFetch
        .patch(`/order/cancel/${id}`, { isCancel })
        .then(({ data }) => data);

      if (cancelOrder) {
        const fetchOrders = await customFetch
          .get(`/order/?user=${user._id}&status=${value}`)
          .then(({ data }) => data);
        setOrders(fetchOrders);
      }
    } catch (error) {
      if (error?.response?.status === 401) return navigate("/login");
      return error;
    }
  }, 500);

  const handleChange = debounce(async (event, newValue) => {
    console.log(newValue);
    try {
      setValue(newValue);
      const fetchOrders = await customFetch
        .get(`/order/?user=${user._id}&status=${newValue}`)
        .then(({ data }) => data);

      setOrders(fetchOrders);
    } catch (error) {
      if (error?.response?.status === 401) return navigate("/login");
      return error;
    }
  }, 300);

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="title">Order</div>

        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          {Object.keys(ORDER_STATUS).map((key, idx) => {
            return (
              <Tab
                key={idx}
                value={ORDER_STATUS[key]}
                label={ORDER_STATUS[key]}
              />
            );
          })}
        </Tabs>

        {orders && orders.length > 0 ? (
          <div className="order-list">
            {orders?.map((order) => {
              return (
                <OrderItem
                  key={order._id}
                  order={order}
                  cancelOrder={cancelOrder}
                />
              );
            })}
          </div>
        ) : (
          <div className="order-empty">You haven't had any orders yet.</div>
        )}
      </Wrapper>
    </HelmetProvider>
  );
};

export default Order;
