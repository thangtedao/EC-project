import React from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { useHomeLayoutContext } from "../pages/HomeLayout";
import NavLinks from "./NavLinks";
import NavContainer from "./NavContainer";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

const Wrapper = styled.div`
  .menu-container {
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 100vh;
    position: fixed;
    //inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }
  .show-sidebar {
    z-index: 98;
    opacity: 1;
    visibility: visible;
  }
  .menu-tree {
    width: 400px;
    background: yellow;
    border-radius: var(--border-radius);
  }
  .menu-tree-child {
    width: 300px;
    height: 500px;
    background: green;
    border-radius: var(--border-radius);
    display: none;
  }

  .active {
    color: var(--primary-500);
  }
`;

const CategorySideBar = () => {
  const { showSideBar, toggleSideBar } = useHomeLayoutContext();

  const handleItemHover = (item) => {
    setActiveItem(item);
  };

  const category = [
    {
      name: "Điện thoại",
      categoryProduct: [
        {
          brandName: "Apple",
        },
        {
          brandName: "Samsung",
        },
      ],
    },
    {
      name: "Máy tính",
      categoryProduct: [
        {
          brandName: "Apple",
        },
        {
          brandName: "Samsung",
        },
      ],
    },
    {
      name: "Laptop",
      categoryProduct: [
        {
          brandName: "Apple",
        },
        {
          brandName: "Samsung",
        },
      ],
    },
  ];

  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "menu-container show-sidebar" : "menu-container"
        }
      >
        <div className="menu-tree">
          {/* {category?.map((item) => {
            return (
              <div className="item" onMouseEnter={() => handleItemHover}>
                <NavLinks text={item} icon={<SmartphoneIcon />} path="#" />
              </div>
            );
          })} */}
        </div>
        <div className="menu-tree-child"></div>
      </div>
    </Wrapper>
  );
};

export default CategorySideBar;
