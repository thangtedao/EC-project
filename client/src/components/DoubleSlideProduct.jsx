import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductContainer from "./ProductContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.section`
  width: 1100px;
  .product-container {
    width: 13.5rem;
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
  //border: 1px solid white;
  .slide {
  }
`;

const RelatedProduct = ({ img }) => {
  const settings = {
    className: "slide",
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    rows: 2,
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
      <Slider {...settings}>
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
        <ProductContainer
          img={img}
          name="Laptop"
          price="999"
          oldPrice="9999"
          descript="ngon lành cành đào ngon lành cành đào"
        />
      </Slider>
    </Wrapper>
  );
};

export default RelatedProduct;
