import React from "react";
import styled from "styled-components";
import ProductContainer from "../ProductContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.section`
  width: 80vw;
  border: 1px solid white;
  .slide {
  }
`;

const RelatedProduct = ({ img }) => {
  const settings = {
    className: "slide",
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Wrapper>
      <Slider className="slide" {...settings}>
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
