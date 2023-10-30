import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, HomeLayout, Login, ProductCategory, Register } from "./pages";
import ProductDetail from "./pages/ProductDetail";

/* LOADER */
import { loader as homeLayoutLoader } from "./pages/HomeLayout";
import { loader as homeLoader } from "./pages/Home";
import { loader as productDetailLoader } from "./pages/ProductDetail";
import { loader as productCategoryLoader } from "./pages/ProductCategory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    loader: homeLayoutLoader,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
        loader: productDetailLoader,
      },
      {
        path: "category",
        element: <ProductCategory />,
        loader: productCategoryLoader,
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
