import { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CartItem } from "../components/index.js";
import { toast } from "react-toastify";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import NovaIcon from "../assets/LogoNova.svg";
import { Button, message, Steps } from "antd";
import { PaymentInfo } from "../components/index.js";
import { PaymentCheckout } from "../components/index.js";

const Wrapper = styled.div`
  width: 650px;
  height: 100%;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .cart-header {
    padding: 1rem;
    text-align: center;
    font-weight: 700;
    font-size: large;
    display: grid;
    grid-template-columns: auto 1fr;
    place-items: center;
    border-bottom: 1px solid lightgray;
  }
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .product-item-outer {
    width: 100%;
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0.5rem 1rem;
  }
  .product-item {
    position: relative;
    display: flex;
    height: 80px;
  }
  .product-image {
    width: 20%;
    height: inherit;
    img {
      height: inherit;
    }
  }
  .product-info {
    width: 80%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .product-info-name {
    font-size: 0.9rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    font-size: 1.1rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .count {
      font-size: 1rem;
      font-weight: 500;
    }
  }
  .main-price {
    color: #cf0000;
    display: flex;
    gap: 1rem;
    .strike {
      font-size: 0.95rem;
      color: #707070;
      text-decoration: line-through;
      text-decoration-thickness: 1px;
    }
  }
  .product-count {
    color: black;
    display: flex;
    input {
      width: 30px;
      text-align: center;
      font-size: 14px;
      border: transparent;
      background-color: transparent;
    }
    .count-btn {
      width: 30px;
      height: 30px;
      border-radius: 3px;
      background-color: lightgray;
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
  .form-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    p {
      text-transform: uppercase;
    }
  }
  .form-info-input {
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0.5rem 1rem 1rem 1rem;
    gap: 1.5rem;
  }
  .form-address {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
    column-gap: 1rem;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 1rem;
  }
  .bottom-bar {
    width: 100%;
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: white;
    gap: 1rem;
    .btn {
      height: 2.5rem;
      border-radius: 5px;
      border: none;
      background: #d70018;
      font-size: medium;
      color: white;
      cursor: pointer;
    }
  }
  .price-temp {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
    font-weight: bold;
  }
`;

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const isValidAddress = (field) => field && field.trim() !== "";

    if (
      isValidAddress(data.city) &&
      isValidAddress(data.district) &&
      isValidAddress(data.ward) &&
      isValidAddress(data.home)
    ) {
      await customFetch.patch("/user/update-user", formData);
      const user = (await customFetch.get("/user/current-user")).data.user;
      store.dispatch(login({ user }));
      return redirect("/cart/payment");
    }

    if (
      !isValidAddress(data.cityC) ||
      !isValidAddress(data.districtC) ||
      !isValidAddress(data.wardC) ||
      !isValidAddress(data.homeC)
    ) {
      return toast.warning("Thông tin không hợp lệ");
    }

    return redirect("/cart/payment");
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loader = async () => {
  try {
    window.scrollTo(0, 0);
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    let cartItem;
    if (user) {
      const cartData = await customFetch
        .get("/cart/get-cart")
        .then(({ data }) => data);
      cartItem = cartData.cartItem;
    }
    const totalPrice =
      cartItem?.reduce(
        (acc, item) =>
          acc +
          (item.variant?.reduce((a, i) => a + i.priceModifier, 0) +
            item.product.price) *
            item.quantity,
        0
      ) || 0;

    return { cartItem, totalPrice };
  } catch (error) {
    if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const Payment = () => {
  const { cartItem, totalPrice } = useLoaderData();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(totalPrice || 0);
  const [coupon, setCoupon] = useState(null);
  const [paypalButtonKey, setPaypalButtonKey] = useState(0);

  const applyCoupon = async (code) => {
    const couponData = await customFetch
      .post("/coupon/apply", { code })
      .then(({ data }) => data);

    if (couponData) {
      if (couponData.discountType === "percentage")
        setTotalAmount(
          (totalPrice - (totalPrice * couponData.discountValue) / 100).toFixed(
            0
          )
        );
      else if (couponData.discountType === "fixed")
        setTotalAmount(totalPrice - couponData.discountValue);
      setCoupon(couponData);
    }
    setPaypalButtonKey((prevKey) => prevKey + 1);
  };

  const steps = [
    {
      title: "Info",
      content: <PaymentInfo cartItem={cartItem} />,
    },
    {
      title: "Checkout",
      content: (
        <PaymentCheckout
          cartItem={cartItem}
          coupon={coupon}
          applyCoupon={applyCoupon}
          totalAmount={totalAmount}
          paypalButtonKey={paypalButtonKey}
        />
      ),
    },
  ];

  // antd
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    height: "fit-content",
    textAlign: "center",
    borderRadius: 5,
    marginTop: 16,
  };
  //antd

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Payment Info</title>
          <link rel="icon" type="image/svg+xml" href={NovaIcon} />
        </Helmet>

        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>

        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Payment;
