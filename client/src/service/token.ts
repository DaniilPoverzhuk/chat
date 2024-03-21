import { AxiosResponse } from "axios";
import axios from "@/axios";

import { IUser } from "@/types";
import { IUserDataResponse } from "./auth";

import CustomLocalStorage from "@/utils/CustomLocalStorage";

export const check = async (): Promise<AxiosResponse<IUserDataResponse>> => {
  const response = await axios<IUserDataResponse>("/token/check");

  CustomLocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  CustomLocalStorage.set<IUser>(response.data.user, "author");

  return response;
};

export const update = async (): Promise<AxiosResponse<IUserDataResponse>> => {
  const response = await axios<IUserDataResponse>("/token/update");

  response;

  return response;
};
