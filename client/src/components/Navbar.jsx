import React from "react";
import styled from "styled-components";
import { FaAlignLeft, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { Search, Notifications, Menu, Close } from "@mui/icons-material";
import { useHomeLayoutContext } from "../pages/HomeLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  z-index: 99;
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .nav-link {
    background: transparent;
    border-color: transparent;
    font-size: 1.1rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .nav-links {
    display: flex;
    gap: 1.2rem;
  }
  .logo-text {
    display: none;
  }
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }
  .icon {
    margin-right: 0.5rem;
    display: grid;
    place-items: center;
  }
  .search-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 10px;
    border: 1px solid gray;
    border-radius: 8px;
    padding: 0.2rem 0.5rem;
    width: 20vw;
    min-width: 50px;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
  @media (min-width: 410px) {
  }
`;

const Navbar = () => {
  const { toggleSideBar } = useHomeLayoutContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <div>
          <h4 className="logo">Put logo here</h4>
          <h4 className="logo-text">dashboard</h4>
        </div>
        <SearchBar />
        <div className="nav-links">
          <button type="button" className="toggle-btn" onClick={toggleSideBar}>
            <span className="icon">
              <FaAlignLeft />
            </span>
            Danh mục
          </button>
          <NavLinks text="Giỏ hàng" icon={<FaShoppingBag />} path="#" />
          <NavLinks text="Đăng nhập" icon={<FaUserCircle />} path="/login" />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
