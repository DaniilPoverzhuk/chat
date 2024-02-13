import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { ROUTES } from "./routes";

import "@/styles/globals.scss";

import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Registration from "@/pages/registration";
import Home from "@/pages/home";
import store from "./lib/store";

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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
