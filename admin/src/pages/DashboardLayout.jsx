import React, { createContext, useContext, useState } from "react";
import Wrapper from "../assets/wrapper/dashboard/DashboardLayout";
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

export const loader = async () => {
  try {
    const user = await customFetch
      .get("/user/current-user")
      .then(({ data }) => data.user);

    const newOrders = await customFetch
      .get("/order/?isSeen=false&&admin=true")
      .then(({ data }) => data);

    return { user, newOrders };
  } catch (error) {
    if (error?.response?.status === 403) return redirect("/login");
    else if (error?.response?.status === 401) return redirect("/login");
    return error;
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const { user, newOrders } = useLoaderData();
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
        newOrders,
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
