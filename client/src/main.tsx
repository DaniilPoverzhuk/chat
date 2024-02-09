import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ROUTES } from "./routes";

import "@/styles/globals.scss";

import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Registration from "@/pages/registration";
import Home from "@/pages/home";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.REGISTRATION,
    element: <Registration />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
