import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ProductCart } from "../components";
import { pink } from "@mui/material/colors";

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
`;

export const loader = async ({ params }) => {
  try {
    return null;
  } catch (error) {
    return error;
  }
};

const Payment = () => {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <Wrapper>
      <div className="cart-header">
        <ArrowBackIcon /> Thông tin
      </div>
      <div className="cart-container">
        <div className="header-action">
          <Checkbox
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
            className="checkbox-btn"
            icon={<CircleOutlinedIcon />}
            checkedIcon={<CheckCircleIcon />}
          />
          Chọn tất cả
        </div>
        {cart?.map((item, index) => {
          return <ProductCart key={index} product={item} />;
        })}
      </div>
    </Wrapper>
  );
};

export default Payment;
