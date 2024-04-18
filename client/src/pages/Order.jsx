import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/Order.js";
import { OrderCard } from "../components";
import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch.js";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { store } from "../state/store.js";
import { setCart } from "../state/cartSlice.js";
import NovaIcon from "../assets/logo/LogoNova.svg";

export const loader = async () => {
  try {
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    if (user) {
      const orders = await customFetch
        .get(`/order/?user=${user._id}`)
        .then(({ data }) => data);
      return { orders };
    }
    return null;
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const Order = () => {
  window.scrollTo(0, 0);
  const { orders } = useLoaderData();

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Order</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <div className="title">Đơn hàng của bạn</div>
        {orders && orders.length > 0 ? (
          <div className="order-list">
            {orders?.map((order) => {
              return <OrderCard key={order._id} order={order} />;
            })}
          </div>
        ) : (
          <div className="order-empty">
            <p>Bạn chưa có hóa đơn nào</p>
            <p>Hãy chọn mua sản phẩm để có hóa đơn nhé</p>
          </div>
        )}
      </Wrapper>
    </HelmetProvider>
  );
};

export default Order;
