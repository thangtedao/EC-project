import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* ACTION */
import { action as addCouponAction } from "./pages/AddCoupon";

/* LOADER */
import { loader as dashboardLoader } from "./pages/Dashboard";
import { loader as dashboardLayoutLoader } from "./pages/DashboardLayout";
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
import { loader as addEventLoader } from "./pages/AddEvent";

import { loader as detailProductLoader } from "./pages/DetailProduct";
import { loader as detailCategoryLoader } from "./pages/DetailCategory";

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
import Chat from "./pages/Chat";
import AddEvent from "./pages/AddEvent";
import AllBlogs from "./pages/AllBlogs";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";
import CommentBlogMng from "./pages/CommentBlogMng";
import CommentProductMng from "./pages/CommentProductMng";

import DetailProduct from "./pages/DetailProduct";
import DetailCategory from "./pages/DetailCategory";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    loader: dashboardLayoutLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
      },
      {
        path: "add-event",
        element: <AddEvent />,
        loader: addEventLoader,
      },
      {
        path: "all-product",
        element: <AllProduct />,
        loader: allProductLoader,
      },
      {
        path: "add-product",
        element: <AddProduct />,
        loader: addProductLoader,
      },
      //
      {
        path: "detail-product/:id",
        element: <DetailProduct />,
        loader: detailProductLoader,
      },
      {
        path: "detail-category/:id",
        element: <DetailCategory />,
        loader: detailCategoryLoader,
      },
      //
      {
        path: "edit-product/:id",
        element: <EditProduct />,
        loader: editProductLoader,
      },
      {
        path: "add-category",
        element: <AddCategory />,
        loader: addCategoryLoader,
      },
      {
        path: "all-category",
        element: <AllCategory />,
        loader: allCategoryLoader,
      },
      {
        path: "edit-category/:id",
        element: <EditCategory />,
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
        path: "edit-coupon/:id",
        element: <EditCoupon />,
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
        loader: editOrderLoader,
      },
      {
        path: "chat",
        element: <Chat />,
      },
      {
        path: "all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "add-blog",
        element: <AddBlog />,
      },
      {
        path: "edit-blog/:id",
        element: <EditBlog />,
      },
      {
        path: "commentblogmng",
        element: <CommentBlogMng />,
      },
      {
        path: "commentproductmng",
        element: <CommentProductMng />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
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
