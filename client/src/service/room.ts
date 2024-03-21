import instance from "@/axios";
import { IDefaultResponse, IRoom } from "@/types";
import { AxiosResponse } from "axios";

interface CreateProps {
  avatar?: string;
  authorId: number;
  users: number[];
  isCommunity?: boolean;
}

interface CreateResponse {
  room: IRoom;
  message: string;
}

export const create = async ({
  avatar,
  authorId,
  users,
  isCommunity = false,
}: CreateProps): Promise<AxiosResponse<CreateResponse>> => {
  const data = { users, isCommunity, authorId, avatar };
  const response = await instance.post("/rooms/create", data);

  return response;
};

interface GetAllResponse extends IDefaultResponse {
  rooms: IRoom[];
}

export const getAll = async (id: number): Promise<IRoom[]> => {
  const response = await instance.post<GetAllResponse>("/rooms/getAll", { id });

  return response.data.rooms;
};
