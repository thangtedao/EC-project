import React, { useEffect, useState } from "react";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { FormRow, FormRowSelect, ProductCard } from "../components";
import {
  Link,
  Form,
  redirect,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;

  @media (max-width: 1550px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1385px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media (max-width: 975px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const loader = async () => {
  try {
    const products = await customFetch
      .get(`/product`)
      .then(({ data }) => data.products);
    return products;
  } catch (error) {
    return error;
  }
};

const AllProduct = () => {
  const products = useLoaderData();

  return (
    <Wrapper>
      {products.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </Wrapper>
  );
};

export default AllProduct;
