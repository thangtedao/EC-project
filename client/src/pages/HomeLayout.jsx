import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { CategorySideBar, MenuBottom, Navbar } from "../components";
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
    const { data } = await customFetch.get("/category/get/parent");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const HomeLayoutContext = createContext();

const HomeLayout = () => {
  const { data } = useLoaderData();
  const { categories } = data;

  const user = { name: "thang" };
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {};

  return (
    <HomeLayoutContext.Provider
      value={{
        categories,
        user,
        showSideBar,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <Navbar />
        <CategorySideBar />
        <div className="main-layout">
          <Outlet context={{ user }} />
        </div>
        <MenuBottom />
      </Wrapper>
    </HomeLayoutContext.Provider>
  );
};

export const useHomeLayoutContext = () => useContext(HomeLayoutContext);
export default HomeLayout;
