import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductContainer from "../ProductContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.section`
  width: 100%;

  @media (max-width: 1100px) {
  }
  @media (max-width: 1070px) {
  }
  @media (max-width: 970px) {
  }
  @media (max-width: 690px) {
  }
`;

const DoubleSlideProduct = ({ products }) => {
  const check = products.length >= 12;

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    rows: 2,
    arrows: false,
    responsive: [
      {
        breakpoint: 1020,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 850,
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
      {check && (
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
      )}
    </Wrapper>
  );
};

export default DoubleSlideProduct;
