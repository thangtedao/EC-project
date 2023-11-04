import React from "react";
import styled from "styled-components";
import ProductCard from "./ProductCard";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;

  /* PRODUCTS */
  .super-container {
    //width: 19%;
  }

  /* MEDIA QUERIES */
  @media (max-width: 1080px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 865px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 690px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 350px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ProductList = ({ products }) => {
  return (
    <Wrapper>
      {products.map((product, index) => {
        return <ProductCard key={index} product={product} />;
      })}
    </Wrapper>
  );
};

export default ProductList;
