import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useHomeLayoutContext } from "../pages/HomeLayout";
import NavLinks from "./NavLinks";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import { categoryData } from "../assets/data/categoryData.js";

const Wrapper = styled.div`
  .menu-container {
    display: flex;
    justify-content: center;
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
  .container-menu {
    width: 1100px;
    display: flex;
    justify-content: center;
    padding-top: 1rem;
  }
  .show-sidebar {
    z-index: 98;
    opacity: 1;
    visibility: visible;
  }
  .menu-tree {
    height: 800px;
    border-radius: var(--border-radius);
    background: var(--background-secondary-color);
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: 1px solid lightgray;
    border-radius: 10px;
    width: 200px;
    height: 350px;
  }
  .menu-tree-child {
    width: calc(100% - 200px);
    height: fit-content;
    padding: 1rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
    gap: 5rem;
    flex-wrap: wrap;
    //display: none;
    visibility: hidden;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--primary-500);
    padding: 3px 2px;
    border-radius: 5px 5px 0 0;
    :hover {
      background: #efecec;
    }
  }
  .icon {
    margin-right: 10px;
    display: grid;
    place-items: center;
  }

  .show-category {
    //display: block;
    visibility: visible;
  }
  .category-product {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .active {
    color: var(--primary-500);
  }
`;

const CategorySideBar = () => {
  const { showSideBar, toggleSideBar } = useHomeLayoutContext();

  // show khi hover
  const [showCategory, setShowCategory] = useState(false);
  const [isHoverItemTree, setIsHoverItemTree] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  // useCallback để tránh tạo lại hàm khi re-render trong event onMouseEnter, .....
  const handleItemHover = useCallback(
    (item) => {
      setIsHoverItemTree(true);
      setActiveItem(item);
      setShowCategory(true);
    },
    [setActiveItem, setShowCategory, setIsHoverItemTree]
  );

  const handleItemLeave = () => {
    if (!isHoverItemTree && !showCategory) {
      setActiveItem(null);
      setShowCategory(false);
    }
  };

  const category = categoryData;

  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "menu-container show-sidebar" : "menu-container"
        }
        onClick={toggleSideBar}
      >
        <div className="container-menu">
          {/* MENU TREE */}
          <div className="menu-tree">
            {category?.map((item) => {
              return (
                <div
                  className="item"
                  onMouseEnter={() => handleItemHover(item)}
                  onMouseLeave={() => [
                    setShowCategory(false),
                    setIsHoverItemTree(false),
                    handleItemLeave,
                  ]}
                >
                  <NavLinks
                    text={item.name}
                    icon={<SmartphoneIcon />}
                    path="#"
                  />
                </div>
              );
            })}
          </div>

          {/* MENU TREE CHILD*/}
          <div
            className={
              showCategory ? "menu-tree-child show-category" : "menu-tree-child"
            }
            onMouseEnter={() => setShowCategory(true)}
            onMouseLeave={() => setShowCategory(false)}
          >
            <div className="category-product">
              <p>Thương hiệu</p>
              {activeItem?.categoryProduct?.map((item) => {
                return <h5>{item.brandName}</h5>;
              })}
            </div>

            <div className="category-product">
              <p>Màu sắc</p>
              {activeItem?.categoryProduct?.map((item) => {
                return <h5>{item.color}</h5>;
              })}
            </div>

            <div className="category-product">
              <p>Màu sắc</p>
              {activeItem?.categoryProduct?.map((item) => {
                return <h5>{item.color}</h5>;
              })}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CategorySideBar;
