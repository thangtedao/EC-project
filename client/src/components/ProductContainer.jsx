import React from "react";
import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .products {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 100%;
    height: 30%;
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

const ProductContainer = ({ img, name, price, descript }) => {
  return (
    <Wrapper>
      <div className="products">
        <img src={img} alt={name} />
        <h3> {name}</h3>
        <h3> {price}</h3>
        <p>{descript}</p>
      </div>
    </Wrapper>
  );
};

export default ProductContainer;
