import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  .product-container {
    border: 0.5px solid lightgrey;
    height: 380px;
    padding: 5px;
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .img {
    width: 100%;
    height: 10rem;
    margin-bottom: 2px;
    img {
      width: 50px;
      height: 50px;
      border: 0.5px solid lightgrey;
    }
  }
  .name {
    margin: 5px 0;
    font-size: large;
  }
  .price {
    margin-top: 20%;
    font-size: large;
    color: red;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 10%;
    font-weight: 700;
  }
  .old-price {
    font-size: medium;
    color: gray;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  .descript {
    margin-top: 10%;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
    background: lightgray;
    padding: 0.5rem 0.25rem;
    border-radius: 5px;
    font-size: small;
  }
`;

const ProductContainer = ({ img, name, price, oldPrice, descript }) => {
  return (
    <Wrapper>
      <div className="product-container">
        <div className="product">
          <div className="img">
            <img src={img} alt={name} />
          </div>
          <div className="name">
            <p> {name}</p>
          </div>
          <div className="price">
            <p> {price && price + "đ"}</p>
            <p className="old-price">{oldPrice && oldPrice + "đ"}</p>
          </div>
          <div className="descript">
            <p>{descript}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductContainer;
