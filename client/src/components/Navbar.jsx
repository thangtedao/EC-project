import React from "react";
import styled from "styled-components";
import { FaAlignLeft, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { Search, Notifications, Menu, Close } from "@mui/icons-material";
import { useHomeLayoutContext } from "../pages/HomeLayout";
import LogoutContainer from "./LogoutContainer";
import ThemeToggle from "./ThemeToggle";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  background: #ff3636;
  z-index: 99;
  height: 3.5rem;

  .nav-center {
    display: flex;
    width: 90%;

    align-items: center;
    justify-content: space-between;
  }
  .logo {
    display: flex;
    align-items: center;
    width: 100px;
  }

  .search-bar {
    background: white;
    display: grid;
    grid-template-columns: 1fr auto;
    column-gap: 0.75rem;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 0 0.5rem;
    width: 20vw;
    min-width: 50px;
  }

  .nav-links {
    display: flex;
    gap: 1.2rem;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .icon {
    margin-right: 0.5rem;
    display: grid;
    place-items: center;
  }
  .nav-link {
    background: transparent;
    border-color: transparent;
    font-size: 1.1rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  @media (min-width: 992px) {
    position: sticky;
    top: 0;
  }
`;

const Navbar = () => {
  const { toggleSideBar } = useHomeLayoutContext();
  return (
    <Wrapper>
      <div className="nav-center">
        <h4 className="logo">Logo</h4>

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
