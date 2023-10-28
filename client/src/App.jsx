import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, HomeLayout, Login, ProductCategory, Register } from "./pages";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
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
        path: "product-detail",
        element: <ProductDetail />,
      },
      {
        path: "category",
        element: <ProductCategory />,
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
