import React from "react";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import HomeIcon from "@mui/icons-material/Home";
import { FaAlignLeft } from "react-icons/fa";
import { useMainLayoutContext } from "../pages/MainLayout";

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  display: none;
  .menu-bottom-tab {
    background: var(--background-secondary-color);
    display: flex;
    justify-content: space-between;
  }
  .nav-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1rem;
    color: white;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 750px) {
    bottom: 0;
    left: 0;
    display: flex;
    position: fixed;
    z-index: 99;
  }
`;

const MenuBottom = () => {
  const { toggleSideBar } = useMainLayoutContext();
  return (
    <Wrapper>
      <div className="menu-bottom-tab">
        <NavLinks text="Trang chủ" icon={<HomeIcon />} path="/" />
        <button type="button" className="toggle-btn" onClick={toggleSideBar}>
          <span className="icon">
            <FaAlignLeft />
          </span>
          Danh mục
        </button>
      </div>
    </Wrapper>
  );
};

export default MenuBottom;
