import instance from "@/axios";
import { AxiosResponse } from "axios";

import { ID, IDefaultResponse, ITimeStamps, IUser } from "@/types";

export const getAll = async (id: number): Promise<IUser[]> => {
  const response = await instance.post<IUser[]>("/friends/getAll", { id });

  return response.data;
};

interface IFriend extends ID, ITimeStamps {
  user_id: number;
  friend_id: number;
}

interface IAddResponse {
  friend: IFriend;
  message: string;
}

interface AddProps {
  user_id: number;
  friend_id: number;
}

export const add = async (
  data: AddProps
): Promise<AxiosResponse<IAddResponse>> => {
  const response = await instance.post<IAddResponse>("/friends/add", data);

  return response;
};

export interface IFriendRequest extends ID, ITimeStamps {
  sender_id: number;
  getter_id: number;
}

interface FriendRequestsResponse extends IDefaultResponse {
  friendRequests: IFriendRequest[];
}

type TypeOrderBy = "sender_id" | "getter_id";

interface GetFriendRequestsProps {
  id: number;
  orderBy?: TypeOrderBy;
}

export const getFriendRequests = async ({
  id,
  orderBy = "sender_id",
}: GetFriendRequestsProps): Promise<IFriendRequest[]> => {
  const data = { id, orderBy };
  const response = await instance.post<FriendRequestsResponse>(
    "/friends/get-friend-request",
    data
  );

  return response.data.friendRequests;
};

interface SendFriendRequestProps {
  sender_id: number;
  getter_id: number;
}

interface SendFriendRequestResponse extends IDefaultResponse {
  friendRequest: IFriendRequest;
}

export const sendFriendRequest = async (
  data: SendFriendRequestProps
): Promise<IFriendRequest> => {
  const response = await instance.post<SendFriendRequestResponse>(
    "/friends/send-friend-request",
    data
  );

  return response.data.friendRequest;
};
