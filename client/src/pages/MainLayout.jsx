import React, { createContext, useContext, useState } from "react";
import { Footer, Header, Loading } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  position: relative;

  .main-layout {
    min-height: 700px;
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

export const loader = async () => {
  try {
    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data);

    const categoriesChild = await customFetch
      .get(`/category/get/child`)
      .then(({ data }) => data);

    const filtercategoriesChild = categories.map((category) => {
      return categoriesChild.filter((child) => child.parent === category._id);
    });

    return { categories, categoriesChild, filtercategoriesChild };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const MainLayoutContext = createContext();

const MainLayout = () => {
  const { categories, categoriesChild, filtercategoriesChild } =
    useLoaderData();
  const [showSideBar, setShowSideBar] = useState(false);
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <MainLayoutContext.Provider
      value={{
        categories,
        categoriesChild,
        filtercategoriesChild,
        showSideBar,
        toggleSideBar,
      }}
    >
      <Wrapper>
        <Header />
        <div className="main-layout">
          {isPageLoading ? <Loading /> : <Outlet context={{}} />}
        </div>
        <Footer />
      </Wrapper>
    </MainLayoutContext.Provider>
  );
};

export const useMainLayoutContext = () => useContext(MainLayoutContext);
export default MainLayout;
