import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { Footer, Header } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .main-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const loader = async () => {
  try {
    const categories = await customFetch
      .get("/category/")
      .then(({ data }) => data.categories);
    return { categories };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const MainLayoutContext = createContext();

const MainLayout = () => {
  const { categories } = useLoaderData();
  const user = { name: "thang" };
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {};

  return (
    <MainLayoutContext.Provider
      value={{
        categories,
        user,
        showSideBar,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <Header />
        <div className="main-layout">
          <Outlet context={{ user }} />
        </div>
        <Footer />
      </Wrapper>
    </MainLayoutContext.Provider>
  );
};

export const useMainLayoutContext = () => useContext(MainLayoutContext);
export default MainLayout;
