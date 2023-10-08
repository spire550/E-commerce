import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Carts from "./components/Carts/Carts";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import CounterContextProvider from "./context/counterContext";
import { useContext, useEffect } from "react";
import { UserToken } from "./context/userToken";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";
import Details from "./components/details/details";
import Category from "./components/Category/Category";
import ForgetPassword from "./components/forgetPassword/forgetPassword";
import ResetPassword from "./components/resetPassword/resetPassword";
import toast, { Toaster } from "react-hot-toast";
import Checkout from "./components/checkout/checkout";
import Brands from "./components/Brands/Brands";
import Favorite from "./components/Favorite/Favorite";
import BrandsDetails from "./components/BrandDetails/BrandDetails";

export default function App() {
  let { setToken } = useContext(UserToken);

  const Router = createHashRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "Home",
          element: (
            <ProtectedRouter>
              <Home />
            </ProtectedRouter>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRouter>
              <Products />
            </ProtectedRouter>
          ),
        },
        {
          path: "carts",
          element: (
            <ProtectedRouter>
              <Carts />
            </ProtectedRouter>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouter>
              <Brands />
            </ProtectedRouter>
          ),
        },
        {
          path: "favorite",
          element: (
            <ProtectedRouter>
              <Favorite />
            </ProtectedRouter>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRouter>
              <Checkout />
            </ProtectedRouter>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRouter>
              <Category />
            </ProtectedRouter>
          ),
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        { path: "BrandsDetails/:id", element: <BrandsDetails /> },

        { path: "resetPassword", element: <ResetPassword /> },
        {
          path: "details/:id",
          element: (
            <ProtectedRouter>
              <Details />
            </ProtectedRouter>
          ),
        },

        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"));
    }
  });

  return (
    <>
      <CounterContextProvider>
        <RouterProvider router={Router}></RouterProvider>
        <Toaster />
      </CounterContextProvider>
    </>
  );
}
