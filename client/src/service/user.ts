import { AxiosResponse } from "axios";
import axios from "@/axios";

import { IDefaultResponse, IUser } from "@/types";
import LocalStorage from "@/utils/CustomLocalStorage";

interface IGetAllResponse {
  users: IUser[];
  message: string;
}

export const getAll = async (): Promise<AxiosResponse<IGetAllResponse>> => {
  const author = LocalStorage.get<IUser>("author");

  const data = { email: author?.email };

  const response = await axios<IGetAllResponse>({
    method: "post",
    url: "/users",
    data,
  });

  return response;
};

interface ChangeOnlineStatusResponse extends IDefaultResponse {
  user: IUser;
}

export const changeOnlineStatus = async (
  status: boolean,
  userId: number
): Promise<AxiosResponse<ChangeOnlineStatusResponse>> => {
  const response = await axios<ChangeOnlineStatusResponse>({
    method: "post",
    url: "/users/change-online-status",
    data: { status, userId },
  });

  return response;
};
