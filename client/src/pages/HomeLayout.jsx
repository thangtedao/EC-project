import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";
import { CategorySideBar, MenuBottom, Navbar } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .main-layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const loader = async () => {
  try {
    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data.categories);

    const childCategoriesPromises = categories.map(async (category) => {
      const { data } = await customFetch.get(
        `/category/get/child/${category._id}`
      );
      const { categories } = data;
      return categories;
    });
    const childCategories = await Promise.all(childCategoriesPromises);

    return { categories, childCategories };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const HomeLayoutContext = createContext();

const HomeLayout = () => {
  const { categories, childCategories } = useLoaderData();

  const user = { name: "thang" };
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {};

  return (
    <HomeLayoutContext.Provider
      value={{
        categories,
        childCategories,
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
          <Outlet context={{ user }} />
        </div>
        <MenuBottom />
      </Wrapper>
    </HomeLayoutContext.Provider>
  );
};

export const useHomeLayoutContext = () => useContext(HomeLayoutContext);
export default HomeLayout;
