import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { CategorySideBar, MenuBottom, Navbar } from "../components";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .main-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const HomeLayoutContext = createContext();

const HomeLayout = () => {
  const user = { name: "thang" };
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {};

  return (
    <HomeLayoutContext.Provider
      value={{
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
          <Outlet />
        </div>
        <MenuBottom />
      </Wrapper>
    </HomeLayoutContext.Provider>
  );
};

export const useHomeLayoutContext = () => useContext(HomeLayoutContext);
export default HomeLayout;
