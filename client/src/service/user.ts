import { AxiosResponse } from "axios";
import axios from "@/axios";

import { IUser } from "@/types";
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
