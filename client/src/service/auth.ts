import instance from "@/axios";
import axios, { AxiosResponse } from "axios";

import LocalStorage from "@/utils/CustomLocalStorage";
import { IUser } from "@/types";

interface LoginProps {
  email: string;
  password: string;
}

interface IUserDataResponse {
  message: string;
  user: IUser;
}

export const login = async (
  data: LoginProps
): Promise<AxiosResponse<IUserDataResponse>> => {
  const response = await instance<IUserDataResponse>({
    method: "post",
    url: "/auth/login",
    data,
  });

  LocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  LocalStorage.set<IUser>(response.data.user, "author");

  return response;
};

interface RegistrationProps {
  email: string;
  username: string;
  password: string;
}

export const registration = async (
  data: RegistrationProps
): Promise<AxiosResponse<IUserDataResponse>> => {
  const response = await instance<IUserDataResponse>({
    method: "post",
    url: "/auth/registration",
    data,
  });

  LocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  LocalStorage.set<IUser>(response.data.user, "author");

  return response;
};

export const check = async (): Promise<AxiosResponse<IUserDataResponse>> => {
  const headers = {
    Authorization: `Bearer ${LocalStorage.get("accessToken")}`,
  };

  const response = await axios<IUserDataResponse>({
    method: "get",
    url: "http://localhost:5001/token/check",
    headers,
    withCredentials: true,
  });

  LocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  LocalStorage.set<IUser>(response.data.user, "user");

  return response;
};
