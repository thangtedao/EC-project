import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Contact,
  Home,
  MainLayout,
  Login,
  Category,
  Register,
  Product,
  Cart,
  Payment,
  PaymentInfo,
} from "./pages";

/* ACTION */
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";

/* LOADER */
import { loader as mainLayoutLoader } from "./pages/MainLayout";
import { loader as homeLoader } from "./pages/Home";
import { loader as productLoader } from "./pages/Product";
import { loader as categoryLoader } from "./pages/Category";
import { loader as cartLoader } from "./pages/Cart";
import { loader as paymentInfoLoader } from "./pages/PaymentInfo";

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
        element: <Product />,
        loader: productLoader,
      },
      {
        path: "cart",
        children: [
          {
            index: true,
            element: <Cart />,
            loader: cartLoader,
          },
          {
            path: "payment-info",
            element: <PaymentInfo />,
            loader: paymentInfoLoader,
          },
          {
            path: "payment",
            element: <Payment />,
          },
        ],
      },
      {
        path: "category/:slug1",
        element: <Category />,
        loader: categoryLoader,
        children: [
          {
            path: ":slug2",
            element: <Category />,
            loader: categoryLoader,
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
