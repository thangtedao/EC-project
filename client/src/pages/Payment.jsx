import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { PayPalButton } from "../components";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 650px;
  height: fit-content;
  min-height: 800px;
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
  .header-action {
    //padding: 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .product-item-outer {
    background-color: white;
    border: 1px solid lightgray;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0.5rem 0;
  }
  .product-item {
    position: relative;
    display: flex;
    //padding-left: 1rem;
  }
  .checkbox-btn {
    width: 30px;
    height: 30px;
  }
  .product-image {
    width: 20%;
    img {
      width: 100%;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .product-info-price {
    color: #cf0000;
    display: flex;
    justify-content: space-between;
    align-items: center;
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

  .info-payment {
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 0.5rem;
  }
  .flex-between {
    display: flex;
    justify-content: space-between;
    //padding: 0.5rem 1rem 1rem 1rem;
    padding: 0.25rem 1rem;
    gap: 1rem;
  }
  .btn-apply {
    width: 5rem;
    margin-top: 0.75rem;
    height: 2.3rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    background: #d70018;
    color: white;
    cursor: pointer;
  }
  .payment-title {
    margin: 1rem 0 0.5rem 0;
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

export const loader = async () => {
  try {
    window.scrollTo(0, 0);
    const response = await customFetch.get("/user/cart");

    return response.data.cart;
  } catch (error) {
    return error;
  }
};

const Payment = () => {
  const navigate = useNavigate();
  const couponTextFieldRef = useRef();
  const user = useSelector((state) => state.user.user);
  // const cart = useSelector((state) => state.cart.cart);
  const cart = useLoaderData();

  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(cart.cartTotal);
  const [coupon, setCoupon] = useState(null);
  const [paypalButtonKey, setPaypalButtonKey] = useState(0);

  const changePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const totalPrice = cart.cartTotal;
  // const totalPrice =
  //   cart?.products.reduce(
  //     (accumulator, item) => accumulator + item.salePrice * item.count,
  //     0
  //   ) || 0;

  const handleCheckout = async () => {
    await customFetch
      .post(`/order/create-checkout-session`, { cart, user })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  const applyCoupon = async () => {
    if (coupon) {
      toast.success("Đã áp mã giảm giá", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "colored",
      });
      return;
    }
    const fetchCoupon = await customFetch
      .get(`coupon/${couponTextFieldRef.current.value}`)
      .then((response) => response.data.coupon);
    if (!fetchCoupon) {
      toast.warning("Mã giảm giá không hợp lệ", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "colored",
      });
    } else {
      setCoupon(fetchCoupon);
      setPaypalButtonKey((prevKey) => prevKey + 1);
      const totalAfterDiscount =
        totalPrice - (totalPrice * fetchCoupon.discount) / 100;
      setTotalAfterDiscount(totalAfterDiscount);
      toast.success("Áp mã giảm giá thành công", {
        position: "top-center",
        autoClose: 1000,
        pauseOnHover: false,
        theme: "colored",
      });
    }
  };

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Payment</title>
        </Helmet>

        <div className="cart-header">
          <a onClick={() => navigate("/cart/payment-info")}>
            <ArrowBackIcon />
          </a>
          Thanh toán
        </div>
        <div className="info-payment">
          <div className="flex-between">
            <TextField
              label="Mã giảm giá"
              variant="standard"
              placeholder="Nhập mã giảm giá (chỉ áp dụng 1 lần)"
              sx={{ width: "85%" }}
              inputRef={couponTextFieldRef}
              defaultValue={"sale"}
            />
            <button className="btn-apply" onClick={applyCoupon}>
              Áp dụng
            </button>
          </div>
          <div className="flex-between">
            <p>Số lượng sản phẩm</p>
            {cart?.products.length}
          </div>
          <div className="flex-between">
            <p>Tiền hàng (tạm tính)</p>
            {totalPrice}₫
          </div>
          <div className="flex-between">
            <p>Phí vận chuyển</p>
            Miễn phí
          </div>
          <div className="flex-between">
            <p>Tổng tiền (đã gồm VAT)</p>
            {totalAfterDiscount}₫
          </div>
        </div>

        <div>
          <div className="payment-title">PHƯƠNG THỨC THANH TOÁN</div>
          <RadioGroup
            value={paymentMethod}
            onChange={changePaymentMethod}
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label="PayPal or Credit Card"
            />
            <FormControlLabel
              value="stripe"
              control={<Radio />}
              label="Stripe"
            />
          </RadioGroup>
        </div>

        <div className="payment-title">THÔNG TIN NHẬN HÀNG</div>
        <div className="info-payment">
          <div className="flex-between">
            <p>Khách hàng:</p>
            {user?.fullName}
          </div>
          <div className="flex-between">
            <p>Số điện thoại:</p>
            {user?.phone}
          </div>
          <div className="flex-between">
            <p>Email:</p>
            {user?.email}
          </div>
          <div className="flex-between">
            <p>Nhận hàng tại:</p>
            {user?.address &&
              `${user?.address.city}, ${user?.address.district}, ${user?.address.ward}, ${user?.address.home}`}
          </div>
        </div>

        <div className="bottom-bar">
          <div className="price-temp">
            <p>Tổng tiền tạm tính:</p>
            {totalAfterDiscount}₫
          </div>
          {paymentMethod === "paypal" ? (
            <PayPalButton
              key={paypalButtonKey}
              cart={cart}
              coupon={coupon}
              user={user}
            />
          ) : (
            <button className="btn" onClick={() => handleCheckout()}>
              Thanh toán
            </button>
          )}
        </div>
      </Wrapper>
    </HelmetProvider>
  );
};

export default Payment;
