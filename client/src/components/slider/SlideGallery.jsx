import Slider from "react-slick";
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
    text-align: center;
    font-size: 18px;
    background: #fff;
  }
  .swiper-slide img {
  }
`;

const SlideGallery = ({ image }) => {
  // const settings = {
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  // };

  return (
    <Wrapper>
      <Swiper
        loop={true}
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

    // <Slider {...settings}>
    //   {image.map((img, index) => {
    //     return <img key={index} className="product-img" src={img} />;
    //   })}
    // </Slider>
  );
};

export default SlideGallery;
