import React, { createContext, useContext, useState } from "react";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;

  .dashboard {
    position: absolute;
    left: 255px;
    width: calc(100% - 255px);
    display: flex;
    flex-direction: column;
  }
  .dashboard-page {
    background-color: #ffffff;
    width: 100%;
    padding: 2rem;
  }
`;

export const loader = async () => {
  try {
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    return user;
  } catch (error) {
    if (error?.response?.status === 403) return redirect("/login");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = useLoaderData();
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

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
        <Sidebar />
        <div className="dashboard">
          <Navbar />
          <div className="dashboard-page">
            {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
          </div>
        </div>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
