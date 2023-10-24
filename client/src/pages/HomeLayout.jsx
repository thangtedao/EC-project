import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import styled from "styled-components";

const Wrapper = styled.div`
  .main-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const HomeLayoutContext = createContext();

const HomeLayout = ({ isDarkThemeEnabled }) => {
  const user = { name: "thang" };
  const [showSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("dark-theme", newDarkTheme);
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {};

  return (
    <HomeLayoutContext.Provider
      value={{
        user,
        showSideBar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <Navbar />
        <div className="main-layout">
          <Outlet />
        </div>
      </Wrapper>
    </HomeLayoutContext.Provider>
  );
};

export const useHomeLayoutContext = () => useContext(HomeLayoutContext);
export default HomeLayout;
