import instance from "@/axios";
import axios, { AxiosResponse } from "axios";

import LocalStorage from "@/utils/CustomLocalStorage";
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
