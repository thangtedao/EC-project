import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;

  .swiper-slide {
    background: #fff;
    display: grid;
    place-items: center;
  }
  .swiper-slide img {
    max-height: 350px;
  }
`;

const SlideGallery = ({ image }) => {
  return (
    <Wrapper>
      <Swiper
        loop={image.length > 1 ? true : false}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        {image.map((img, index) => {
          return (
            <SwiperSlide key={index}>
              <img className="product-img" src={img} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Wrapper>
  );
};

export default SlideGallery;
