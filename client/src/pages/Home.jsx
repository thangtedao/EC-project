import React, { createContext, useContext, useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/Home.js";
import { SlideProduct } from "../components";
import { NavLink, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoIosArrowForward } from "react-icons/io";
import SlideGallery from "../components/SlideGallery";
import { Helmet, HelmetProvider } from "react-helmet-async";
import NovaIcon from "../assets/logo/LogoNova.svg";
import { useMainLayoutContext } from "../pages/MainLayout";
import AppChat from "../components/AppChat/AppChat";
import { useSelector } from "react-redux";
import { Statistic, ConfigProvider, Typography, Flex } from "antd";

import img1 from "../assets/data/image/asus.png";
import img2 from "../assets/data/image/asus1.png";
import img4 from "../assets/data/image/1.png";
import img5 from "../assets/data/image/2.png";
import img6 from "../assets/data/image/3.png";
import moment from "moment";

export const loader = async () => {
  try {
    await customFetch.patch("/promotion/set-promotion");

    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data);

    const productsArray = await Promise.all(
      categories.map(async (category) => {
        const products = await customFetch
          .get(`/product/?category=${category._id}&limit=20&status=Available`)
          .then(({ data }) => data);

        return products;
      })
    );

    const allEvent = await customFetch
      .get("/promotion/")
      .then(({ data }) => data);

    window.scrollTo(0, 0);
    return { productsArray, allEvent };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const HomeContext = createContext();

const Home = () => {
  const user = useSelector((state) => state.user.user);

  const { categories } = useMainLayoutContext();
  const { productsArray, allEvent } = useLoaderData();

  const [event, setEvent] = useState(allEvent[0]);

  const { Countdown } = Statistic;

  const now = new Date();
  const [startDate, setStartDate] = useState(new Date(event?.startDate));
  const [endDate, setEndDate] = useState(new Date(event?.endDate));
  const [deadline, setDeadline] = useState(
    startDate <= now ? endDate : startDate
  );
  const [deadlineText, setDeadlineText] = useState(
    startDate <= now ? "Đang diễn ra:" : "Sắp diễn ra:"
  );

  useEffect(() => {
    setDeadline(startDate <= now ? endDate : startDate);
    setDeadlineText(startDate <= now ? "Đang diễn ra:" : "Sắp diễn ra:");
  }, [startDate, endDate]);

  const onFinish = () => {
    console.log("finished!");
  };

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
              <SlideGallery image={[img1, img2]} />
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
              <div className="sale-title">{event?.name}</div>
              <ConfigProvider
                theme={{
                  components: {
                    Statistic: {
                      contentFontSize: 18,
                    },
                  },
                  token: {
                    colorText: "#fff",
                    fontSize: 18,
                  },
                }}
              >
                <div
                  style={{
                    width: "fit-content",
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <Typography>{deadlineText}</Typography>
                  <Countdown
                    value={deadline}
                    format="DD : HH : mm : ss"
                    onFinish={onFinish}
                  />
                </div>
              </ConfigProvider>
            </div>

            <div className="tabs">
              {allEvent.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="tab"
                    onClick={() => [
                      setEvent(item),
                      setStartDate(new Date(item?.startDate)),
                      setEndDate(new Date(item?.endDate)),
                    ]}
                  >
                    {item.name}
                  </div>
                );
              })}
            </div>

            {event?.products?.length > 0 && (
              <SlideProduct products={event.products} />
            )}
          </div>

          {/* PRODUCTS SALE */}
          {categories.map((category, index) => {
            if (productsArray[index].length > 0)
              return (
                productsArray[index] && (
                  <div key={index} className="product-by-category">
                    <NavLink
                      className="product-by-category-title"
                      to={`/category/${category._id}`}
                    >
                      {productsArray[index].length > 0 && category.name}
                    </NavLink>
                    <SlideProduct products={productsArray[index] || []} />
                  </div>
                )
              );
          })}

          {/* {user && <AppChat />} */}
        </Wrapper>
      </HomeContext.Provider>
    </HelmetProvider>
  );
};

export const useHomeContext = () => useContext(HomeContext);
export default Home;
