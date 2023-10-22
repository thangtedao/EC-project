import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import { BigSideBar, Navbar, SmallSideBar } from "../components";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import NavContainer from "../components/NavContainer";
import ProductContainer from "../components/ProductContainer";
import Product from "../components/Product";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

const HomeLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <NavContainer />
        <Product />
      </main>
    </Wrapper>
  );
};

export default HomeLayout;
