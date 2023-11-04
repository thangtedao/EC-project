import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Contact,
  Home,
  MainLayout,
  Login,
  ProductCategory,
  Register,
} from "./pages";
import ProductDetail from "./pages/ProductDetail";

/* ACTION */
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";

/* LOADER */
import { loader as mainLayoutLoader } from "./pages/MainLayout";
import { loader as homeLoader } from "./pages/Home";
import { loader as productDetailLoader } from "./pages/ProductDetail";
import { loader as productCategoryLoader } from "./pages/ProductCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    loader: mainLayoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "product/:slug",
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: "category/:slug1",
        element: <ProductCategory />,
        loader: productCategoryLoader,
        children: [
          {
            path: ":slug2",
            element: <ProductCategory />,
            loader: productCategoryLoader,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
