import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import img from "../assets/data/image/laptop002.jpg";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Wrapper = styled.div`
  width: 650px;
  height: 800px;
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
  }
  .header-action {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
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
    padding-left: 1rem;
  }
  .checkbox-wrapper {
    position: absolute;
    top: 0;
    left: 0;
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
    }
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
  const cart = useSelector((state) => state.cart.cart);
  const token = useSelector((state) => state.user.token);
  console.log(cart);
  console.log(token);

  return (
    <Wrapper>
      <div className="cart-header">
        <ArrowBackIcon /> Giỏ hàng của bạn
      </div>
      <div className="cart-container">
        <div className="header-action">
          <input type="checkbox" name="product" />
          <label htmlFor="product">Chọn tất cả</label>
        </div>

        <div className="product-item-outer">
          <div className="product-item">
            <div className="checkbox-wrapper">
              <input type="checkbox" />
            </div>

            <div className="product-image">
              <img src={img} alt="product image" />
            </div>

            <div className="product-info">
              <div className="product-info-name">
                Samsung Galaxy Fold5 12GB 1TB-Kem
                <DeleteIcon />
              </div>
              <div className="product-info-price">
                47.990.000đ
                <div className="product-count">
                  <span className="count-btn">-</span>
                  <input type="text" readOnly="readonly" defaultValue="1" />
                  <span className="count-btn">+</span>
                </div>
              </div>
            </div>
          </div>

          <div className="block-combo-promotion">
            <div className="combo-promotion-title"></div>
            <div className="list-combo"></div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
