import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Footer, Header } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .main-layout {
    min-height: 800px;
    display: flex;
    justify-content: center;
  }
`;

export const loader = async () => {
  try {
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    const categories = await customFetch
      .get("/category/get/parent")
      .then(({ data }) => data.categories);

    const categoryChild = await Promise.all(
      categories.map(async (category) => {
        const children = await customFetch
          .get(`/category/get/child/${category._id}`)
          .then(({ data }) => data.categories);

        return children;
      })
    );

    return { user, categories, categoryChild };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const MainLayoutContext = createContext();

const MainLayout = () => {
  const navigate = useNavigate();
  const { user, categories, categoryChild } = useLoaderData();
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {
    await customFetch.get("/auth/logout");
    toast.success("Logged out", {
      position: "top-center",
      autoClose: 1000,
      pauseOnHover: false,
      theme: "colored",
    });
    navigate("/");
  };

  return (
    <MainLayoutContext.Provider
      value={{
        categories,
        categoryChild,
        user,
        showSideBar,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <Header />
        <div className="main-layout">
          <Outlet context={{ user }} />
        </div>
        <Footer />
      </Wrapper>
    </MainLayoutContext.Provider>
  );
};

export const useMainLayoutContext = () => useContext(MainLayoutContext);
export default MainLayout;
