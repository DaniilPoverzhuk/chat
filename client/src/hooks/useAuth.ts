import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import * as AuthService from "@/service/auth";

import { IError } from "@/axios/types";

import CustomLocalStorage from "@/utils/CustomLocalStorage";

const privateRoutes = ["/"];

export default () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (privateRoutes.includes(pathname)) {
      (async () => {
        try {
          const response = await AuthService.check();

          CustomLocalStorage.set<string>(
            response.data.user.accessToken,
            "accessToken"
          );
        } catch (err) {
          const errorObject = err as AxiosError<IError>;

          if (errorObject.response?.data.status === 401) {
            navigate("/registration");
          }
        }
      })();
    }
  }, []);
};
