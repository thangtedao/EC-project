import { createBrowserRouter, RouterProvider } from "react-router-dom";

/* ACTION */
import Login, { action as loginAction } from "./pages/Login";
import { action as addProductAction } from "./pages/AddProduct";

/* LOADER */
import { loader as addProductLoader } from "./pages/AddProduct";

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
