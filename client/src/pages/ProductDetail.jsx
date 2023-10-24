import React from "react";
import styled from "styled-components";
import img from "../assets/react.svg";
import ProductType from "../components/productDetail/ProductType";
import RelatedProduct from "../components/productDetail/RelatedProduct";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SlideProduct } from "../components";

const Wrapper = styled.section`
  width: 1200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  padding: 20px;
  border: 0.5px solid lightgrey;
  .container {
    width: 1100px;
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }
  .main-img {
    height: 350px;
  }
  .column-first {
    width: 55%;
    //border: 0.5px solid lightgrey;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin-right: 1rem;
    border-radius: 10px;
  }
  .column-second {
    width: 45%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .list-item {
    display: grid;
    row-gap: 8px;
    column-gap: 8px;
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
  .btn-buy {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .btn-buynow {
    width: 90%;
    border-radius: 10px;
    border: none;
    background: red;
    font-weight: 700;
    font-size: 1.3rem;
    color: white;
    text-transform: uppercase;
  }
  .btn-addtocart {
    border-color: red;
    color: red;
    background: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    padding: 0.2rem;
    align-self: flex-end;
    p {
      font-size: 0.6rem;
    }
  }
`;

const ProductDetail = () => {
  const products = [
    {
      _id: Math.random(),
      name: "Laptop",
      price: "999",
      oldPrice: "9999",
      descript: "ngon lành cành đào ngon lành cành đào",
      img: img,
    },
    {
      _id: Math.random(),
      name: "Laptop",
      price: "999",
      oldPrice: "9999",
      descript: "ngon lành cành đào ngon lành cành đào",
      img: img,
    },
    {
      _id: Math.random(),
      name: "Laptop",
      price: "999",
      oldPrice: "9999",
      descript: "ngon lành cành đào ngon lành cành đào",
      img: img,
    },
  ];
  const numOfProduct = 3;

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
          <div className="list-item">
            <ProductType text="8GB - 256GB" price="9999đ" />

            <ProductType text="8GB - 256GB" price="9999đ" />

            <ProductType text="8GB - 256GB" price="9999đ" />

            <ProductType text="8GB - 256GB" price="9999đ" />

            <ProductType text="8GB - 256GB" price="9999đ" />

            <ProductType text="8GB - 256GB" price="9999đ" />
          </div>
          <p>Chọn màu</p>
          <div className="list-item">
            <ProductType img={img} text="Vàng" price="9999đ" />

            <ProductType img={img} text="Vàng" price="9999đ" />

            <ProductType text="Vàng" price="9999đ" />
          </div>
          <div className="main-price">
            <p>999đ</p>
            <p className="old-price">9999đ</p>
          </div>
          <div className="btn-buy">
            <button className="btn-buynow">Mua ngay</button>
            <button className="btn-addtocart">
              <AddShoppingCartIcon />
              <p>Thêm vào giỏ</p>
            </button>
          </div>
        </div>
      </div>

      <div>
        {numOfProduct > 0 && (
          <SlideProduct numOfProduct={numOfProduct} products={products} />
        )}
      </div>
    </Wrapper>
  );
};

export default ProductDetail;
