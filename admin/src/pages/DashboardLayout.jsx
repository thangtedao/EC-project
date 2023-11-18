import React, { createContext, useContext, useState } from "react";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Wrapper = styled.section`
  width: 100%;
  .dashboard {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .dashboard-page {
    background-color: green;
    width: 100%;
  }
`;

export const loader = async () => {
  try {
    return null;
  } catch (error) {
    return error;
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = useSelector((state) => state.user.user);

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <Sidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
