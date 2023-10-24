import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import {
  BigSideBar,
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
import Product from "../components/Product";
import img from "../assets/react.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 1200px;
  height: 100%;
  border: 0.5px solid lightgrey;
  .dashboard {
    display: flex;
    gap: 10px;
  }
  @media (min-width: 992px) {
  }
  .main-slide {
    width: 650px;
    border: 0.5px solid lightgrey;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0.75rem;
    border-radius: 10px;
  }
  .main-img {
    height: 350px;
  }
`;

const HomeLayout = () => {
  const numOfProduct = 1;

  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Wrapper>
      <main className="dashboard">
        <NavContainer />
        <div className="main-slide">
          <Slider {...settings}>
            <img className="main-img" src={img} />
            <img className="main-img" src={img} />
            <img className="main-img" src={img} />
          </Slider>
        </div>
        <NavContainer />
      </main>
      <div>
        {numOfProduct > 0 && (
          <SlideProduct
            numOfProduct={numOfProduct}
            img={img}
            name="Laptop"
            price="999"
            oldPrice="9999"
            descript="ngon lành cành đào ngon lành cành đào"
          />
        )}
      </div>
      <h5>ĐIỆN THOẠI NỔI BẬT NHẤT</h5>
      <DoubleSlideProduct img={img} />
      <h5>LAPTOP</h5>
      <DoubleSlideProduct img={img} />
      <h5>MÀN HÌNH, MÁY TÍNH ĐỂ BÀN</h5>
      <DoubleSlideProduct img={img} />
    </Wrapper>
  );
};

export default HomeLayout;
