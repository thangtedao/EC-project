import React, { createContext, useContext } from "react";
import Wrapper from "../assets/wrappers/Home.js";
import { ProductCard, SlideProduct } from "../components";
import { NavLink, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import SlideGallery from "../components/SlideGallery";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";
import { useMainLayoutContext } from "../pages/MainLayout";

import img1 from "../assets/data/image/asus.png";
import img2 from "../assets/data/image/asus1.png";
import img4 from "../assets/data/image/1.png";
import img5 from "../assets/data/image/2.png";
import img6 from "../assets/data/image/3.png";
import AppChat from "../components/AppChat/AppChat";
import { useSelector } from "react-redux";

export const loader = async () => {
  try {
    const products = await customFetch.get(`/product`).then(({ data }) => data);
    return products;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const HomeContext = createContext();

const Home = () => {
  const user = useSelector((state) => state.user.user);

  window.scrollTo(0, 0);
  const { categories, categoriesChild, filtercategoriesChild } =
    useMainLayoutContext();
  const products = useLoaderData();

  // const productsArray = categories.map((cat) => {
  //   return products.filter((product) => {
  //     return product.category.includes(cat._id.toString());
  //   });
  // });

  const productsArray = [];
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    const categoryProducts = [];
    for (let j = 0; j < products.length; j++) {
      const product = products[j];
      if (product.category.includes(cat._id.toString())) {
        categoryProducts.push(product);
      }
    }
    if (categoryProducts.length > 0) {
      productsArray.push(categoryProducts);
    }
  }

  // productsArray = productsArray.map((item) => {
  //   if (item.length > 0 && item.length < 2) {
  //     item = item[0];
  //     return [item];
  //   } else return item;
  // });

  console.log(productsArray[0][2]);
  // productsArray[1] = JSON.parse(productsArray[1]);
  // if (productsArray[1].length > 0) {
  //   // Lặp qua từng phần tử trong mảng và log từng phần tử ra
  //   for (let i = 0; i < productsArray[1].length; i++) {
  //     console.log(productsArray[1][i]);
  //   }
  // } else {
  //   console.log("productsArray[1] is empty or does not contain any items.");
  // }
  // console.log(productsArray[1][1]);

  const img = [img1, img2];

  return (
    <HelmetProvider>
      <HomeContext.Provider value={null}>
        <Wrapper>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Nova</title>
            <link rel="icon" type="image/svg+xml" href={NovaIcon} />
          </Helmet>

          <div className="block-top-home">
            {/* MENU TREE */}
            <div className="menu-container">
              {categories?.map((category) => {
                return (
                  <NavLink
                    className="nav-link"
                    key={category._id}
                    to={`/category/${category._id}`}
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
          {/* <div className="block-hot-sale">
            <div className="block-title">
              <div className="sale-title">FLASH SALE</div>
              <div className="box-countdown">00:11:22:33</div>
            </div>
            {products?.length > 0 && <SlideProduct products={products} />}
          </div> */}
          {/* PRODUCTS SALE */}
          {/* {categories.map((category, index) => {
            return (
              productsArray[index] && (
                <div key={index} className="product-by-category">
                  <NavLink
                    to={`/category/${category._id}`}
                    className="product-by-category-title"
                  >
                    {productsArray[index].length > 0 && category.name}
                  </NavLink>
                  <SlideProduct products={productsArray[index] || []} />
                </div>
              )
            );
          })} */}

          <SlideProduct products={productsArray[1]} />

          {/* {categories.map((category, index) => {
            return productsArray[index] ? (
              <div key={index} className="product-by-category">
                <NavLink
                  to={`/category/${category._id}`}
                  className="product-by-category-title"
                >
                  {productsArray[index].length > 0 && category.name}
                </NavLink>
                <SlideProduct products={productsArray[index] || []} />
              </div>
            ) : (
              <div key={index} className="product-by-category">
                <p>No products available for this category</p>
              </div>
            );
          })} */}

          {/* {products.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })} */}
          {user && user.role !== "admin" ? <AppChat></AppChat> : ""}
        </Wrapper>
      </HomeContext.Provider>
    </HelmetProvider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
export default Home;
