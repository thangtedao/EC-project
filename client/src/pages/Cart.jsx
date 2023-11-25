import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ProductCart } from "../components";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

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
  .cart-empty {
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    font-size: large;
  }
  .cart-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .header-action {
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
    padding: 1rem 0;
  }
  .product-item {
    height: 120px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .checkbox-btn {
    width: 30px;
    height: 30px;
  }
  .product-image {
    margin-left: 10px;
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
  .bottom-bar {
    width: 100%;
    align-self: flex-end;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: white;
    .btn {
      border-radius: 10px;
      border: none;
      background: red;
      font-weight: bold;
      color: white;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
  .price-temp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    font-weight: bold;
  }
`;

export const loader = async ({ params }) => {
  try {
    return null;
  } catch (error) {
    return error;
  }
};

const Cart = () => {
  window.scrollTo(0, 0);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const totalPrice =
    cart?.reduce(
      (accumulator, item) => accumulator + item.salePrice * item.count,
      0
    ) || 0;

  return (
    <Wrapper>
      <div className="cart-header">
        <a onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </a>
        Giỏ hàng của bạn
      </div>
      {cart.length <= 0 ? (
        <div className="cart-empty">
          <p>Giỏ hàng của bạn đang trống.</p>
          <p>Hãy chọn thêm sản phẩm để mua sắm nhé</p>
        </div>
      ) : (
        <div className="cart-container">
          {/* <div className="header-action">
            <Checkbox
              className="checkbox-btn"
              icon={<CircleOutlinedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
            Chọn tất cả
          </div> */}

          {cart?.map((item, index) => {
            return <ProductCart key={index} product={item} />;
          })}

          <div className="bottom-bar">
            <div className="price-temp">
              <p>Tạm tính</p>
              {totalPrice}đ
            </div>
            <button className="btn" onClick={() => navigate("payment-info")}>
              Mua ngay {`(${cart.length})`}
            </button>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Cart;
