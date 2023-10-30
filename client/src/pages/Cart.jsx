import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;

const Cart = () => {
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
