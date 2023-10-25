import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductContainer from "../ProductContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

const Wrapper = styled.section`
  border: 1px solid red;
  .slide-product-list {
    width: 1100px;
  }
  .product-container {
    width: 13rem;
  }
  @media (max-width: 1100px) {
    width: 100vw;
  }
  @media (max-width: 1070px) {
    .product-container {
      width: 24vw;
    }
  }
  @media (max-width: 970px) {
    .product-container {
      width: 31vw;
    }
  }
  @media (max-width: 690px) {
    .product-container {
      width: 48vw;
    }
  }
`;

const SlideProduct = ({ products }) => {
  const check = products.length <= 5;
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1070,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 970,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <Wrapper>
      <div className="slide-product-list">
        {!check ? (
          <Slider {...settings}>
            {products?.map((product) => {
              return (
                <ProductContainer
                  key={product._id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  descript={product.descript}
                />
              );
            })}
          </Slider>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {products.map((product) => {
              return (
                <ProductContainer
                  key={product._id}
                  img={product.img}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  descript={product.descript}
                />
              );
            })}
          </Box>
        )}
      </div>
    </Wrapper>
  );
};

export default SlideProduct;
