import styled from "styled-components";
import ProductContainer from "../ProductContainer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box } from "@mui/material";

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

const SlideProduct = ({ products }) => {
  const check = products.length <= 5;
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
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
      {!check ? (
        <Slider {...settings}>
          {products?.map((product) => {
            return (
              <ProductContainer
                key={product._id}
                img={product.image[0]}
                name={product.name}
                price={product.salePrice || product.price}
                oldPrice={product.salePrice && product.price}
                descript={product.description}
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
                img={product.image[0]}
                name={product.name}
                price={product.salePrice || product.price}
                oldPrice={product.salePrice && product.price}
                descript={product.description}
              />
            );
          })}
        </Box>
      )}
    </Wrapper>
  );
};

export default SlideProduct;
