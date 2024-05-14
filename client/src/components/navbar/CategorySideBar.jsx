import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useMainLayoutContext } from "../../pages/MainLayout";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  font-size: 0.95rem;

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
    height: 350px;
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
    p {
      font-weight: 700;
    }
  }
  .active {
    color: var(--primary-500);
  }
`;

const CategorySideBar = () => {
  const {
    showSideBar,
    toggleSideBar,
    categories,
    categoriesChild,
    filtercategoriesChild,
  } = useMainLayoutContext();
  const navigate = useNavigate();

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
                  <a className="nav-link" href={`/category/${item?._id}`}>
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
              <p>Danh mục con</p>
              {categoriesChild &&
                filtercategoriesChild &&
                filtercategoriesChild[activeItem.index]?.map((item) => {
                  return (
                    <a href={`/category/${item?._id}`} key={item?._id}>
                      {item?.name}
                    </a>
                  );
                })}
            </div>

            {/* Laptop */}
            {activeItem?.item?._id?.toString() ===
              "6623da1d2ad63a5f8791b371" && (
              <div className="category-product">
                <p>Mức giá</p>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=15000000&minPrice=10000000`}
                >
                  Từ 10 - 15 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=20000000&minPrice=15000000`}
                >
                  Từ 15 - 20 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=30000000&minPrice=20000000`}
                >
                  Từ 20 - 30 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=50000000&minPrice=30000000`}
                >
                  Trên 30 triệu
                </a>
              </div>
            )}

            {activeItem?.item?._id?.toString() ===
              "6623da1d2ad63a5f8791b371" && (
              <div className="category-product">
                <p>Cấu hình</p>
                <a
                  href={`/category/${activeItem?.item?._id}?ram=8gb&ổ+cứng=512gb`}
                >
                  Ram 8GB - Bộ nhớ 512GB
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?ram=16gb&ổ+cứng=512gb`}
                >
                  Ram 16GB - Bộ nhớ 512GB
                </a>
              </div>
            )}

            {/* Điện thoại */}
            {activeItem?.item?._id?.toString() ===
              "6623f234e14536afabb43126" && (
              <div className="category-product">
                <p>Mức giá</p>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=4000000&minPrice=0`}
                >
                  Dưới 4 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=7000000&minPrice=4000000`}
                >
                  Từ 4 - 7 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=13000000&minPrice=7000000`}
                >
                  Từ 7 - 13 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=20000000&minPrice=13000000`}
                >
                  Từ 13 - 20 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=50000000&minPrice=20000000`}
                >
                  Trên 20 triệu
                </a>
              </div>
            )}

            {activeItem?.item?._id?.toString() ===
              "6623f234e14536afabb43126" && (
              <div className="category-product">
                <p>Cấu hình</p>
                <a
                  href={`/category/${activeItem?.item?._id}?ram=6gb&bộ+nhớ=128gb`}
                >
                  6GB Ram - 128GB Bộ nhớ
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?ram=6gb&bộ+nhớ=512gb`}
                >
                  6GB Ram - 512GB Bộ nhớ
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?ram=8gb&bộ+nhớ=128gb`}
                >
                  8GB Ram - 128GB Bộ nhớ
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?ram=8gb&bộ+nhớ=256gb`}
                >
                  8GB Ram - 256GB Bộ nhớ
                </a>
              </div>
            )}

            {/* PC */}
            {activeItem?.item?._id?.toString() ===
              "66253e9098b8275b6574fb31" && (
              <div className="category-product">
                <p>Mức giá</p>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=10000000&minPrice=0`}
                >
                  Dưới 10 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=15000000&minPrice=10000000`}
                >
                  Từ 10 - 15 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=20000000&minPrice=15000000`}
                >
                  Từ 15 - 20 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=30000000&minPrice=20000000`}
                >
                  Từ 20 - 30 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=50000000&minPrice=30000000`}
                >
                  Trên 30 triệu
                </a>
              </div>
            )}

            {/* Màn hình */}
            {activeItem?.item?._id?.toString() ===
              "66253e9a98b8275b6574fb39" && (
              <div className="category-product">
                <p>Mức giá</p>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=4000000&minPrice=0`}
                >
                  Dưới 4 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=7000000&minPrice=4000000`}
                >
                  Từ 4 - 7 triệu
                </a>
                <a
                  href={`/category/${activeItem?.item?._id}?maxPrice=13000000&minPrice=7000000`}
                >
                  Từ 7 - 15 triệu
                </a>
              </div>
            )}

            {activeItem?.item?._id?.toString() ===
              "66253e9a98b8275b6574fb39" && (
              <div className="category-product">
                <p>Kích thước màn</p>
                <a href={`/category/${activeItem?.item?._id}?kích+thước=24`}>
                  24 inches
                </a>
                <a href={`/category/${activeItem?.item?._id}?kích+thước=27`}>
                  27 inches
                </a>
                <a href={`/category/${activeItem?.item?._id}?kích+thước=34`}>
                  34 inches
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CategorySideBar;
