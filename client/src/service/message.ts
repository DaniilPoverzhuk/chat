import instance from "@/axios";

import { IDefaultResponse, IMessage } from "@/types";
import { AxiosResponse } from "axios";

export const save = async (
  message: IMessage
): Promise<AxiosResponse<IMessage>> => {
  const response = await instance<IMessage>({
    method: "post",
    url: "/message/save",
    data: message,
  });

  return response;
};

interface GetAllResponse extends IDefaultResponse {
  messages: IMessage[];
}

export const getAll = async (
  roomId: number
): Promise<AxiosResponse<GetAllResponse>> => {
  const response = await instance<GetAllResponse>({
    method: "post",
    url: "/message/getAll",
    data: {
      roomId,
    },
  });

  return response;
};
