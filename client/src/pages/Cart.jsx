import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ProductCart } from "../components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 650px;
  height: fit-content;
  min-height: 600px;
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
    overflow: hidden;
  }
  .product-item {
    height: 100px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .checkbox-btn {
    width: 30px;
    height: 30px;
  }
  .product-image {
    text-align: center;
    margin-left: 10px;
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
    font-size: 1.1rem;
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
      background-color: #f3f3f3;
      display: grid;
      place-items: center;
      font-weight: lighter;
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
      background: #d70018;
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

export const loader = async () => {
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
              {totalPrice}₫
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
