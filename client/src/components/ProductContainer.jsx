import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  border: 2px solid white;
  width: 230px;
  height: 350px;
  padding: 5px;
  border-radius: 10px;
  margin-bottom: 10px;
  img {
    min-width: 100%;
    height: 10rem;
    margin-bottom: 2px;
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
    background: var(--background-secondary-color);
    padding: 0.5rem 0.25rem;
    border-radius: 5px;
    font-size: small;
  }
`;

const ProductContainer = ({ img, name, price, oldPrice, descript }) => {
  return (
    <Wrapper>
      <img src={img} alt={name} />
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
    </Wrapper>
  );
};

export default ProductContainer;
