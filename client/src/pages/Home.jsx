import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { SlideProduct } from "../components";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import NavContainer from "../components/NavContainer";
import Product from "../components/home/Product";
import img from "../assets/react.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products, products_v2 } from "../assets/data/data.js";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;
  border: 0.5px solid green;

  /* TOP HOME */
  .block-top-home {
    width: 100%;
    border: 1px solid red;
    display: flex;
    justify-content: space-between;
  }
  .right-banner {
    border: 0.5px solid lightgrey;
    width: 220px;
  }
  .sliding-banner {
    width: calc(100% - 420px);
    border: 0.5px solid lightgrey;
    border-radius: 10px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0.75rem;
  }
  .sliding-banner-img {
    height: 350px;
  }

  /* FLASH SALE */
  .block-hot-sale {
    width: 100%;
    border-radius: 10px;
    border: 0.5px solid yellowgreen;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
  }
  .block-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
  }
  .sale-title {
    font-size: 2rem;
    font-weight: 700;
    color: red;
  }
  .box-countdown {
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 960px) {
    .sliding-banner {
      width: calc(100% - 220px);
    }
  }
  @media (max-width: 800px) {
    .right-banner {
      display: none;
    }
  }
  @media (max-width: 700px) {
    .sliding-banner {
      width: calc(100% - 150px);
    }
    .menu-container {
      width: 150px;
    }
  }
  @media (max-width: 550px) {
    .sliding-banner {
      width: 100%;
    }
    .menu-container {
      display: none;
    }
  }
`;

const HomeLayout = () => {
  const categories = [
    "Apple",
    "Samsung",
    "Xiaomi",
    "OPPO",
    "ViVo",
    "Nokia",
    "Huwaei",
  ];

  const numOfProduct = products.length;

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <div className="block-top-home">
        <NavContainer />
        <div className="sliding-banner">
          <Slider {...settings}>
            <img className="sliding-banner-img" src={img} />
            <img className="sliding-banner-img" src={img} />
            <img className="sliding-banner-img" src={img} />
          </Slider>
        </div>
        <div className="right-banner"></div>
      </div>

      {/* --------- FLASH SALE -------- */}
      <div className="block-hot-sale">
        <div className="block-title">
          <div className="sale-title">FLASH SALE</div>
          <div className="box-countdown">00:11:22:33</div>
        </div>
        {numOfProduct > 0 && <SlideProduct products={products} />}
      </div>

      {/* --------- PRODUCTS SALE -------- */}
      <Product
        title="ĐIỆN THOẠI NỔI BẬT NHẤT"
        categories={categories}
        products={products}
      />

      <Product title="LAPTOP" categories={categories} products={products_v2} />

      <Product
        title="MÀN HÌNH, MÁY TÍNH ĐỂ BÀN"
        categories={categories}
        products={products}
      />
    </Wrapper>
  );
};

export default HomeLayout;
