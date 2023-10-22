import React from "react";
import ProductContainer from "./ProductContainer";
import img from "../assets/react.svg";
import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  gap: 0.75rem;
`;

const Product = () => {
  return (
    <Wrapper>
      <ProductContainer
        img={img}
        name="Laptop"
        price="999"
        descript="ngon lành cành đào ngon lành cành đào"
      />
      <ProductContainer
        img={img}
        descript="ngon lành cành đào ngon lành cành đào"
      />
    </Wrapper>
  );
};

export default Product;
