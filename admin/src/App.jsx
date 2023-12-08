import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* ACTION */
import { action as loginAction } from "./pages/Login";
import { action as addProductAction } from "./pages/AddProduct";
import { action as editProductAction } from "./pages/EditProduct";
import { action as editCouponAction } from "./pages/EditCoupon";
import { action as addCategoryAction } from "./pages/AddCategory";
import { action as addCouponAction } from "./pages/AddCoupon";
import { action as editCategoryAction } from "./pages/EditCategory";
import { action as editUserAction } from "./pages/EditUser";
import { action as editOrderAction } from "./pages/EditOrder";

/* LOADER */
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as addProductLoader } from "./pages/AddProduct";
import { loader as editProductLoader } from "./pages/EditProduct";
import { loader as editCategoryLoader } from "./pages/EditCategory";
import { loader as editCouponLoader } from "./pages/EditCoupon";
import { loader as allProductLoader } from "./pages/AllProduct";
import { loader as allCouponLoader } from "./pages/AllCoupon";
import { loader as addCategoryLoader } from "./pages/AddCategory";
import { loader as allCategoryLoader } from "./pages/AllCategory";
import { loader as allUserLoader } from "./pages/AllUser";
import { loader as editUserLoader } from "./pages/EditUser";
import { loader as allOrderLoader } from "./pages/AllOrder";
import { loader as editOrderLoader } from "./pages/EditOrder";

/* PAGE */
import AllProduct from "./pages/AllProduct";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AllCategory from "./pages/AllCategory";
import AddCategory from "./pages/AddCategory";
import EditCategory from "./pages/EditCategory";
import AddCoupon from "./pages/AddCoupon";
import AllCoupon from "./pages/AllCoupon";
import EditCoupon from "./pages/EditCoupon";
import AllUser from "./pages/AllUser";
import EditUser from "./pages/EditUser";
import AllOrder from "./pages/AllOrder";
import EditOrder from "./pages/EditOrder";
import Login from "./pages/Login";
import DashboardLayout from "./pages/DashboardLayout";
import Error from "./pages/Error";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "all-product",
        element: <AllProduct />,
        loader: allProductLoader,
      },
      {
        path: "add-product",
        element: <AddProduct />,
        action: addProductAction,
        loader: addProductLoader,
      },
      {
        path: "edit-product/:slug",
        element: <EditProduct />,
        action: editProductAction,
        loader: editProductLoader,
      },
      {
        path: "add-category",
        element: <AddCategory />,
        action: addCategoryAction,
        loader: addCategoryLoader,
      },
      {
        path: "all-category",
        element: <AllCategory />,
        loader: allCategoryLoader,
      },
      {
        path: "edit-category/:slug",
        element: <EditCategory />,
        action: editCategoryAction,
        loader: editCategoryLoader,
      },
      {
        path: "add-coupon",
        element: <AddCoupon />,
        action: addCouponAction,
      },
      {
        path: "all-coupon",
        element: <AllCoupon />,
        loader: allCouponLoader,
      },
      {
        path: "edit-coupon/:name",
        element: <EditCoupon />,
        action: editCouponAction,
        loader: editCouponLoader,
      },
      {
        path: "all-user",
        element: <AllUser />,
        loader: allUserLoader,
      },
      {
        path: "edit-user/:id",
        element: <EditUser />,
        action: editUserAction,
        loader: editUserLoader,
      },
      {
        path: "all-order/",
        element: <AllOrder />,
        loader: allOrderLoader,
      },
      {
        path: "edit-order/:id",
        element: <EditOrder />,
        action: editOrderAction,
        loader: editOrderLoader,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
    action: loginAction,
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
