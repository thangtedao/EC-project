import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useSelector } from "react-redux";

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
    return null;
  } catch (error) {
    return error;
  }
};

const DashboardLayoutContext = createContext();

const DashboardLayout = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <DashboardLayoutContext.Provider
      value={{
        user,
      }}
    >
      <Wrapper>
        <div className="main-layout">
          <Outlet context={{ user }} />
        </div>
      </Wrapper>
    </DashboardLayoutContext.Provider>
  );
};

export const useDashboardLayoutContext = () =>
  useContext(DashboardLayoutContext);
export default DashboardLayout;
