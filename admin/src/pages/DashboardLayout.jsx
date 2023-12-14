import React, { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import styled from "styled-components";
import customFetch from "../utils/customFetch";
import { store } from "../state/store.js";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Loading from "../components/Loading";

const Wrapper = styled.section`
  width: 100%;
  .dashboard {
    display: grid;
    grid-template-columns: auto 1fr;
  }
  .dashboard-page {
    background-color: #e8e9ec;
    width: 100%;
    height: calc(100% - 60px);
    padding: 2rem;
  }
`;

export const loader = async () => {
  try {
    let { user } = JSON.parse(localStorage.getItem("persist:user"));

    if (user !== "null") {
      const user = await customFetch
        .get("/user/current-user")
        .then(({ data }) => data.user);
      if (user.role !== "admin") {
        await customFetch.get("/auth/logout");
        dispatch(logout());
        return redirect("/login");
      }
    }

    return null;
  } catch (error) {
    return error;
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

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
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
