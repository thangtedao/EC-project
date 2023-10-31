import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideGallery = ({ image }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {image.map((img, index) => {
        return <img key={index} className="product-img" src={img} />;
      })}
    </Slider>
  );
};

export default SlideGallery;
