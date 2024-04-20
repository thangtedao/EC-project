import React from "react";
import Wrapper from "../assets/wrappers/Header.js";
import Navbar from "./navbar/Navbar";
import CategorySideBar from "./navbar/CategorySideBar";

const Header = () => {
  return (
    <Wrapper>
      <Navbar />
      <CategorySideBar />
    </Wrapper>
  );
};

export default Header;
