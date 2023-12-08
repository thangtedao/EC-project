import React, { createContext, useContext } from "react";
import styled from "styled-components";
import { SlideProduct } from "../components";
import { NavLink, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import SlideGallery from "../components/SlideGallery";
import { Helmet, HelmetProvider } from "react-helmet-async";

import img1 from "../assets/data/image/asus.png";
import img2 from "../assets/data/image/asus1.png";
import img3 from "../assets/data/image/msi.png";
import img4 from "../assets/data/image/1.png";
import img5 from "../assets/data/image/2.png";
import img6 from "../assets/data/image/3.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  width: 1100px;
  height: 100%;

  /* TOP HOME */
  .block-top-home {
    width: 100%;
    //height: 350px;
    display: flex;
    justify-content: space-between;
  }
  .menu-container {
    border: 1px solid lightgray;
    width: 200px;
    border-radius: 5px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.3rem 0.2rem;
    border-radius: 5px;
    color: #4a4a4a;
    font-weight: 700;
    :hover {
      background-color: lightgray;
    }
  }
  .right-banner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 240px;
    img {
      box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
        0 2px 6px 2px rgba(60, 64, 67, 0.15);
      border-radius: 5px;
    }
  }
  .sliding-banner {
    width: calc(100% - 420px);
    border-radius: 10px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    margin: 0 0.75rem;
    overflow: hidden;
  }

  /* FLASH SALE */
  .block-hot-sale {
    width: 100%;
    border-radius: 10px;
    background-color: #580f0f;
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

  /* PRODUCTS SALE  */
  .product-by-category {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    width: 100%;
  }
  .product-by-category-title {
    color: black;
    font-size: 2rem;
    font-weight: bold;
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

    const saleProducts = await customFetch
      .get("/product/?category=mobile&limit=6")
      .then(({ data }) => data.products);

    const productsArray = await Promise.all(
      categories.map(async (category) => {
        const products = await customFetch
          .get(`/product/?category=${category.slug}&limit=20`)
          .then(({ data }) => data.products);

        return products;
      })
    );

    return { saleProducts, categories, productsArray };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const HomeContext = createContext();

const Home = () => {
  window.scrollTo(0, 0);
  const { saleProducts, categories, productsArray } = useLoaderData();

  // const img = [
  //   "https://cdn.viettelstore.vn/Images/Product/ProductImage/1349547788.jpeg",
  //   "https://cdn.viettelstore.vn/Images/Product/ProductImage/1349547788.jpeg",
  //   "https://cdn.viettelstore.vn/Images/Product/ProductImage/1349547788.jpeg",
  // ];
  const img = [img1, img2, img3];

  return (
    <HelmetProvider>
      <HomeContext.Provider value={null}>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Home</title>
          </Helmet>

          <div className="block-top-home">
            {/* MENU TREE */}
            <div className="menu-container">
              {categories?.map((category, index) => {
                return (
                  <NavLink
                    className="nav-link"
                    key={index}
                    to={`/category/${category.slug}`}
                  >
                    {category.name} <IoIosArrowForward />
                  </NavLink>
                );
              })}
            </div>

            {/* SLIDE */}
            <div className="sliding-banner">
              <SlideGallery image={img} />
            </div>
            <div className="right-banner">
              <img src={img4} />
              <img src={img5} />
              <img src={img6} />
            </div>
          </div>

          {/* FLASH SALE */}
          <div className="block-hot-sale">
            <div className="block-title">
              <div className="sale-title">FLASH SALE</div>
              <div className="box-countdown">00:11:22:33</div>
            </div>
            {saleProducts?.length > 0 && (
              <SlideProduct products={saleProducts} />
            )}
          </div>

          {/* PRODUCTS SALE */}
          {categories.map((category, index) => {
            return (
              <div key={index} className="product-by-category">
                <NavLink
                  to={`/category/${category.slug}`}
                  className="product-by-category-title"
                >
                  {productsArray[index].length > 0 && category.name}
                </NavLink>
                <SlideProduct products={productsArray[index] || []} />
              </div>
            );
          })}
        </Wrapper>
      </HomeContext.Provider>
    </HelmetProvider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
export default Home;
