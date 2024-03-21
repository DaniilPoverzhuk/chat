import axios from "@/axios";

import { IDefaultResponse, IMessage } from "@/types";
import { AxiosResponse } from "axios";

export const save = async (
  message: IMessage
): Promise<AxiosResponse<IMessage>> => {
  const { id, ...data } = message;
  const response = await axios.post<IMessage>("/messages/save", data);

  return response;
};

interface GetAllResponse extends IDefaultResponse {
  messages: IMessage[];
}

export const getAll = async (room_id: number): Promise<IMessage[]> => {
  const response = await axios.post<GetAllResponse>("/messages/getAll", {
    room_id,
  });

  return response.data.messages.reverse();
};
