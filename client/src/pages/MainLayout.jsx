import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { Footer, Header, Loading } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

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
      .then(({ data }) => data.categories);

    const categoryChild = await Promise.all(
      categories.map(async (category) => {
        const children = await customFetch
          .get(`/category/get/child/${category._id}`)
          .then(({ data }) => data.categories);

        return children;
      })
    );
    return { categories, categoryChild };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const MainLayoutContext = createContext();

const MainLayout = () => {
  const { categories, categoryChild } = useLoaderData();
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
        categoryChild,
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
