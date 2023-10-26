import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
  border-radius: 5px;
  min-width: 100px;
  width: 31%;
  height: 50px;
  gap: 0.5rem;
  padding: 2px;
  .small-img {
    width: 30px;
    height: 30px;
  }
  .center {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .text-bold {
    font-weight: 400;
  }
  .text-price {
    font-weight: 10;
    font-size: 0.8rem;
  }
`;

const ProductType = ({ img, text, price }) => {
  return (
    <Wrapper>
      {img && <img className="small-img" src={img} />}
      <div className="center">
        <p className="text-bold">{text}</p>
        <p className="text-price">{price}</p>
      </div>
    </Wrapper>
  );
};

export default ProductType;
