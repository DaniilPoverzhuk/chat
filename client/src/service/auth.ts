import instance from "@/axios";
import axios, { AxiosResponse } from "axios";

import CustomLocalStorage from "@/utils/CustomLocalStorage";
import { IUser } from "@/types";

interface LoginProps {
  email: string;
  password: string;
}

export interface IUserDataResponse {
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

  CustomLocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  CustomLocalStorage.set<IUser>(response.data.user, "author");

  return response;
};

interface RegistrationProps {
  email: string;
  username: string;
  password: string;
  avatar: string;
}

export const registration = async (
  data: RegistrationProps
): Promise<AxiosResponse<IUserDataResponse>> => {
  const response = await instance<IUserDataResponse>({
    method: "post",
    url: "/auth/registration",
    data,
  });

  CustomLocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  CustomLocalStorage.set<IUser>(response.data.user, "author");

  return response;
};

interface LogoutResponse {
  message: string;
}

export const logout = async (): Promise<AxiosResponse<LogoutResponse>> => {
  const response = await axios("http://localhost:5001/auth/logout");

  localStorage.clear();

  return response;
};
