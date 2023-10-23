import React from "react";
import styled from "styled-components";
import img from "../assets/react.svg";
import ProductType from "../components/productDetail/ProductType";
import RelatedProduct from "../components/productDetail/RelatedProduct";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  flex-direction: column;
  padding: 20px;
  .container {
    //border: 0.5px solid lightgrey;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
  }
  .main-img {
    width: 30vw;
    height: 40vh;
  }
  .column-first {
    width: 30vw;
    border: 0.5px solid lightgrey;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
    border-radius: 10px;
  }
  .column-second {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    border: 0.5px solid lightgrey;
  }
  .list-item {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .main-price {
    padding: 0.5rem 0;
    border: 1px solid white;
    border-radius: 5px;
    display: flex;
    gap: 10px;
    align-items: center;
    font-weight: 700;
    color: red;
    width: 30%;
  }
  .old-price {
    font-size: 0.8rem;
    font-weight: 5;
    color: gray;
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
`;

const ProductDetail = () => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Wrapper>
      <h3>Apple MacBook Air M1 256GB 2020 I Chính hãng Apple Việt Nam</h3>
      <div className="container">
        <div className="column-first">
          <Slider {...settings}>
            <img className="main-img" src={img} />
            <img className="main-img" src={img} />
            <img className="main-img" src={img} />
          </Slider>
        </div>
        <div className="column-second">
          <div>
            <ul className="list-item">
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
              <li>
                <ProductType text="8GB - 256GB" price="9999đ" />
              </li>
            </ul>
          </div>
          <p>Chọn màu</p>
          <div>
            <ul className="list-item">
              <li>
                <ProductType img={img} text="Vàng" price="9999đ" />
              </li>
              <li>
                <ProductType img={img} text="Vàng" price="9999đ" />
              </li>
              <li>
                <ProductType text="Vàng" price="9999đ" />
              </li>
            </ul>
          </div>
          <div className="main-price">
            <p>999đ</p>
            <p className="old-price">9999đ</p>
          </div>
          <div>
            <button>Mua ngay</button>
            <button>Thâm vào giỏ</button>
          </div>
        </div>
      </div>

      <div>
        <RelatedProduct img={img} />
      </div>
    </Wrapper>
  );
};

export default ProductDetail;
