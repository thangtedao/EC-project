import React from "react";
import styled from "styled-components";
import SlideProduct from "../slider/SlideProduct";
import { DoubleSlideProduct } from "..";
import { Box } from "@mui/material";

const Wrapper = styled.div``;

const Product = ({ title, categories, products }) => {
  let newCategory = categories;
  if (categories.length > 5) {
    newCategory = categories.slice(0, 5);
  }

  const check = products.length >= 12;

  return (
    <Wrapper>
      <div className="product-list-container">
        <div className="product-list-title">
          <h5>{title}</h5>
          <div>
            {categories.length < 5 ? (
              <div className="product-list-category">
                {newCategory.map((category) => {
                  return (
                    <Box borderRadius="10px" padding="0.5rem">
                      {category}
                    </Box>
                  );
                })}
              </div>
            ) : (
              <div className="product-list-category">
                {newCategory.map((category) => {
                  return (
                    <Box
                      borderRadius="10px"
                      border="0.5px solid lightgrey"
                      padding="0.5rem"
                    >
                      {category}
                    </Box>
                  );
                })}
                <Box
                  borderRadius="10px"
                  border="0.5px solid lightgrey"
                  padding="0.5rem"
                >
                  Xem tất cả
                </Box>
              </div>
            )}
          </div>
        </div>
        {check ? (
          <DoubleSlideProduct products={products} />
        ) : (
          <SlideProduct products={products} />
        )}
      </div>
    </Wrapper>
  );
};

export default Product;
