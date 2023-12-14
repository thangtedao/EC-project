import React, { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { Footer, Header, Loading } from "../components";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { store } from "../state/store.js";
import { login } from "../state/userSlice.js";
import { setCart, setCartTotal } from "../state/cartSlice.js";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  .main-layout {
    min-height: 700px;
    display: flex;
    justify-content: center;
    padding-bottom: 2rem;
  }
`;

export const loader = async () => {
  try {
    let { user } = JSON.parse(localStorage.getItem("persist:user"));

    if (user !== "null") {
      const user = await customFetch
        .get("/user/current-user")
        .then(({ data }) => data.user);
      if (user.isBlocked) {
        toast.success("Bạn đã bị block");
        return redirect("/login");
      }
      store.dispatch(login({ user: user }));

      const response = await customFetch.get("/user/cart");
      if (response.data.cart) {
        const cart = response.data.cart?.products?.map((item) => {
          return {
            _id: item.product._id,
            name: item.product.name,
            price: item.product.price,
            salePrice: item.product.salePrice,
            images: item.product.images,
            count: item.count,
            category: item.product.category,
            slug: item.product.slug,
          };
        });
        store.dispatch(setCartTotal(response.data.cart.cartTotal));
        store.dispatch(setCart(cart));
      } else {
        store.dispatch(setCart([]));
      }
    }

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

    return { categories, categoryChild };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const MainLayoutContext = createContext();

const MainLayout = () => {
  const { categories, categoryChild } = useLoaderData();
  const [showSideBar, setShowSideBar] = useState(false);
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <MainLayoutContext.Provider
      value={{
        categories,
        categoryChild,
        showSideBar,
        toggleSideBar,
      }}
    >
      <Wrapper>
        <Header />
        <div className="main-layout">
          {isPageLoading ? <Loading /> : <Outlet context={{}} />}
        </div>
        <Footer />
      </Wrapper>
    </MainLayoutContext.Provider>
  );
};

export const useMainLayoutContext = () => useContext(MainLayoutContext);
export default MainLayout;
