import axios from "@/axios";
import { AxiosResponse } from "axios";

import LocalStorage from "@/utils/localStorage";
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
  const response = await axios<IUserDataResponse>({
    method: "post",
    url: "/login",
    data,
  });

  LocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  LocalStorage.set<IUser>(response.data.user, "user");

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
  const response = await axios<IUserDataResponse>({
    method: "post",
    url: "/registration",
    data,
  });

  LocalStorage.set<string>(response.data.user.accessToken, "accessToken");
  LocalStorage.set<IUser>(response.data.user, "user");

  return response;
};
