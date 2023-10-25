import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import {
  DoubleSlideProduct,
  Navbar,
  SlideProduct,
  SmallSideBar,
} from "../components";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import NavContainer from "../components/NavContainer";
import ProductContainer from "../components/ProductContainer";
import Product from "../components/home/Product";
import img from "../assets/react.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products } from "../assets/data/data.js";
import { Box } from "@mui/material";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  //width: 1200px;
  height: 100%;
  border: 0.5px solid lightgrey;

  /* TOP HOME */
  .block-top-home {
    width: 1100px;
    border: 1px solid red;
    display: flex;
    justify-content: space-between;

    .right-banner {
      border: 0.5px solid lightgrey;
      width: 200px;
    }
  }
  .sliding-banner {
    width: calc(100% - 400px);
    border: 0.5px solid lightgrey;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0.75rem;
    border-radius: 10px;
  }
  .sliding-banner-img {
    height: 350px;
  }

  /* FLASH SALE */
  .block-hot-sale {
    border-radius: 10px;
    border: 0.5px solid lightgrey;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
  }
  .block-title {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
  }
  .sale-title {
    font-size: 2rem;
    font-weight: 700;
    color: red;
  }

  /* PRODUCT */
  .product-list-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .product-list-title {
    display: flex;
    justify-content: space-between;
  }
  .product-list-category {
    display: flex;
    gap: 0.5rem;
  }
  @media (max-width: 1100px) {
    width: 100vw;

    .block-top-home {
      width: 100%;
    }
    .sliding-banner {
      width: calc(100% - 220px);
    }
  }
  @media (max-width: 550px) {
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
      <Box display="none">
        <div className="block-hot-sale">
          <div className="block-title">
            <div className="sale-title">FLASH SALE</div>
            <div className="box-countdown">00:11:22:33</div>
          </div>
          <div className="box-content">
            {numOfProduct > 0 && <SlideProduct products={products} />}
          </div>
        </div>

        <Product
          title="ĐIỆN THOẠI NỔI BẬT NHẤT"
          categories={categories}
          products={products}
        />

        <Product title="LAPTOP" categories={categories} products={products} />

        <Product
          title="MÀN HÌNH, MÁY TÍNH ĐỂ BÀN"
          categories={categories}
          products={products}
        />
      </Box>
    </Wrapper>
  );
};

export default HomeLayout;
