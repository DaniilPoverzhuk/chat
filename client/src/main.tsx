import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import { ROUTES } from "./routes";

import "@/styles/globals.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import NotFound from "@/pages/not-found";
import Login from "@/pages/login";
import Registration from "@/pages/registration";
import Home from "@/pages/home";

import store from "@/lib/store";

import RequireAuth from "@/hoc/RequireAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path={ROUTES.HOME}
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
        errorElement={<NotFound />}
      />
      <Route path={ROUTES.REGISTRATION} element={<Registration />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
