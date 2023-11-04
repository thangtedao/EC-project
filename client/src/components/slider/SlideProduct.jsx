import styled from "styled-components";
import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";

const Wrapper = styled.div`
  width: 100%;

  .swiper {
    width: 100%;
  }
  .double-slide {
    height: 780px;
  }
  .product-not-slide {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    width: 100%;
  }
  @media (max-width: 1100px) {
  }
  @media (max-width: 1080px) {
    .product-not-slide {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media (max-width: 865px) {
    .product-not-slide {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (max-width: 690px) {
    .product-not-slide {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const SlideProduct = ({ products }) => {
  const check = products.length <= 5;
  let doubleSlide = 1;
  if (products.length > 12) doubleSlide = 2;
  else doubleSlide = 1;

  return (
    <Wrapper>
      {!check ? (
        <Swiper
          slidesPerView={5}
          grid={{
            rows: 2,
          }}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            1100: {
              slidesPerView: 5,
              grid: { rows: 2 },
            },
            1020: {
              slidesPerView: 4,
              grid: { rows: 2 },
            },
            850: {
              slidesPerView: 3,
              grid: { rows: 2 },
            },
            690: {
              slidesPerView: 2,
              grid: { rows: 2 },
            },
            10: {
              slidesPerView: 2,
              grid: { rows: 2 },
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay, Navigation, Grid]}
          className={doubleSlide === 2 ? "double-slide" : "mySwiper"}
        >
          {products?.map((product, index) => {
            return (
              <SwiperSlide key={index}>
                <ProductCard product={product} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <div className="product-not-slide">
          {products?.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      )}
    </Wrapper>
  );
};

export default SlideProduct;
