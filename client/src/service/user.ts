import { AxiosResponse } from "axios";
import axios from "@/axios";

import { IUser } from "@/types";

interface IGetAllResponse {
  users: IUser[];
  message: string;
}

export const getAll = async (): Promise<AxiosResponse<IGetAllResponse>> => {
  const response = await axios<IGetAllResponse>({
    method: "get",
    url: "/users",
  });

  return response;
};
