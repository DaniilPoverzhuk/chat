import axios, { AxiosResponse } from "axios";
import instance from "@/axios";

import { IUser } from "@/types";
import { IUserDataResponse } from "./auth";

import CustomLocalStorage from "@/utils/CustomLocalStorage";

export const check = async (): Promise<AxiosResponse<IUserDataResponse>> => {
  const headers = {
    Authorization: `Bearer ${CustomLocalStorage.get("accessToken")}`,
  };

  const response = await axios<IUserDataResponse>({
    method: "get",
    url: "http://localhost:5001/token/check",
    headers,
    withCredentials: true,
  });

  CustomLocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  CustomLocalStorage.set<IUser>(response.data.user, "user");

  return response;
};

export const update = async (): Promise<AxiosResponse<IUserDataResponse>> => {
  const response = await instance<IUserDataResponse>({
    method: "get",
    url: "/token/update",
  });

  return response;
};
