import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { SlideProduct } from "../components";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import NavContainer from "../components/NavContainer";
import Product from "../components/home/Product";
import img from "../assets/react.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { products, products_v2 } from "../assets/data/data.js";
import SlideGallery from "../components/slider/SlideGallery";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;
  //border: 0.5px solid green;

  /* TOP HOME */
  .block-top-home {
    width: 100%;
    //height: 350px;
    //border: 1px solid red;
    display: flex;
    justify-content: space-between;
  }
  .right-banner {
    border: 0.5px solid lightgrey;
    width: 220px;
  }
  .sliding-banner {
    width: calc(100% - 420px);
    //border: 0.5px solid red;
    border-radius: 10px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0.75rem;
    overflow: hidden;
  }
  .product-img {
    height: 350px;
  }

  /* FLASH SALE */
  .block-hot-sale {
    width: 100%;
    border-radius: 10px;
    background-color: #580f0f;
    //border: 0.5px solid yellowgreen;
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
    color: white;
  }

  /* MEDIA QUERIES */
  @media (max-width: 1100px) {
    width: 100%;
  }
  @media (max-width: 960px) {
    .sliding-banner {
      width: calc(100% - 220px);
    }
    .right-banner {
      display: none;
    }
  }
  @media (max-width: 800px) {
  }
  @media (max-width: 700px) {
    .menu-container {
      width: 150px;
    }
    .sliding-banner {
      width: calc(100% - 170px);
    }
  }
  @media (max-width: 550px) {
    .sliding-banner {
      width: 95%;
    }
    .menu-container {
      display: none;
    }
  }
`;

export const loader = async () => {
  try {
    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data.categories);

    const childCategoriesPromises = categories.map(async (category) => {
      const { data } = await customFetch.get(
        `/category/get/child/${category._id}`
      );
      const { categories } = data;
      return categories;
    });
    const childCategories = await Promise.all(childCategoriesPromises);

    return { categories, childCategories };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const HomeContext = createContext();

const HomeLayout = () => {
  //Bị lỗi destructure là do
  //thg component con nó "const categories = useHomeContext();" thay vì "const { categories } = useHomeContext();"
  //khi thg cha truyền vào là value={{categories}} thay vì value={categories} và ngược lại

  const { categories, childCategories } = useLoaderData();

  const numOfProduct = products.length;
  const img = [
    "https://fptshop.com.vn/Uploads/Originals/2023/3/24/638152764193595966_asus-vivobook-flip-tn3402y-bac-dd.jpg",
    "https://techzones.vn/Data/Sites/1/Product/37708/techzones-asus-vivobook-s-14-flip-tn3402-7.jpg",
    "https://cdn1.viettelstore.vn/images/Product/ProductImage/medium/MTXT-HP-Pavilion-14-dv2070TU-7C0V9PA-1.jpg",
  ];

  return (
    <HomeContext.Provider value={{ categories }}>
      <Wrapper>
        <div className="block-top-home">
          <NavContainer />
          <div className="sliding-banner">
            <SlideGallery image={img} />
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
        {categories.map((category, index) => {
          return (
            <Product
              key={index}
              title={category.name}
              categories={childCategories[index] || []} // thứ tự item categories tương ứng thứ tự item childCategories
              products={products}
            />
          );
        })}
      </Wrapper>
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
export default HomeLayout;
