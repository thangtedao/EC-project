import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useMainLayoutContext } from "../pages/MainLayout";
import { IoIosArrowForward } from "react-icons/io";

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
    background: var(--background-secondary-color);
    border: 1px solid lightgray;
    width: 200px;
    border-radius: 5px;
    box-shadow: 1px 2px 1px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    height: 350px;
    overflow: hidden;
    .item {
      width: 100%;
      height: 30px;
      display: grid;
      place-items: center;
      :hover {
        background-color: lightgray;
      }
    }
  }
  .menu-tree-child {
    width: calc(100% - 200px);
    height: 600px;
    padding: 1rem;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
    gap: 5rem;
    flex-wrap: wrap;
    visibility: hidden;
  }

  .nav-link {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 0.2rem;
    border-radius: 5px;
    color: #4a4a4a;
    font-weight: 700;
  }
  .icon {
    margin-right: 10px;
    display: grid;
    place-items: center;
  }

  .show-category {
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
  const { showSideBar, toggleSideBar, categories, categoriesChild } =
    useMainLayoutContext();

  const [showCategory, setShowCategory] = useState(false);
  const [isHoverItemTree, setIsHoverItemTree] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  // useCallback để tránh tạo lại hàm khi re-render trong event onMouseEnter, .....
  const handleItemHover = useCallback(
    ({ item, index }) => {
      setIsHoverItemTree(true);
      setActiveItem({ item, index });
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
            {categories?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="item"
                  onMouseEnter={() => handleItemHover({ item, index })}
                  onMouseLeave={() => [
                    setShowCategory(false),
                    setIsHoverItemTree(false),
                    handleItemLeave,
                  ]}
                >
                  <a className="nav-link" href={`/category/${item?.slug}`}>
                    {item?.name} <IoIosArrowForward />
                  </a>
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
              {/* <p>Thương hiệu</p> */}

              {categoriesChild &&
                categoriesChild[activeItem.index]?.map((item) => {
                  return (
                    <a
                      href={`/category/${categories[activeItem.index].slug}/${
                        item.slug
                      }`}
                      key={item?._id}
                    >
                      {item?.name}
                    </a>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CategorySideBar;
