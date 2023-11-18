import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* ACTION */
import Login, { action as loginAction } from "./pages/Login";
import { action as addProductAction } from "./pages/AddProduct";
import AddCategory, { action as addCategoryAction } from "./pages/AddCategory";

/* LOADER */
import { loader as addProductLoader } from "./pages/AddProduct";
import { loader as addCategoryLoader } from "./pages/AddCategory";

import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import DashboardLayout from "./pages/DashboardLayout";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "add-product",
        element: <AddProduct />,
        action: addProductAction,
        loader: addProductLoader,
      },
      {
        path: "edit-product",
        element: <EditProduct />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
        action: addCategoryAction,
        loader: addCategoryLoader,
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
