import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import * as TokenService from "@/service/token";

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
          const response = await TokenService.check();

          CustomLocalStorage.set<string>(
            response.data.user.accessToken,
            "accessToken"
          );
        } catch (error) {
          navigate("/login");
        }
      })();
    }
  }, []);
};
