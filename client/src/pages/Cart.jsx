import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div``;

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
      <div className="cart-header"></div>
      <div className="cart-container">
        <div className="header-action"></div>
        <div className="product-item-outer">
          <div className="product-item"></div>
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
