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
  Order,
  Wishlist,
} from "./pages";

/* ACTION */
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as productAction } from "./pages/Product";

/* LOADER */
import { loader as mainLayoutLoader } from "./pages/MainLayout";
import { loader as homeLoader } from "./pages/Home";
import { loader as productLoader } from "./pages/Product";
import { loader as categoryLoader } from "./pages/Category";
import { loader as cartLoader } from "./pages/Cart";
import { loader as paymentInfoLoader } from "./pages/PaymentInfo";
import { loader as orderLoader } from "./pages/Order";
import { loader as wishlistLoader } from "./pages/Wishlist";

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
        action: productAction,
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
      {
        path: "order",
        element: <Order />,
        loader: orderLoader,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
        loader: wishlistLoader,
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
