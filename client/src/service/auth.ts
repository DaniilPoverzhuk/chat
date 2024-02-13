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

  return response;
};
