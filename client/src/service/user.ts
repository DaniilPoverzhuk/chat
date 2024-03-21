import { AxiosResponse } from "axios";
import instance from "@/axios";

import { IDefaultResponse, IUser } from "@/types";

interface IGetAllResponse {
  users: IUser[];
  message: string;
}

interface GetProps {
  author: IUser;
  limit: number;
}

export const get = async ({
  author,
  limit = 0,
}: GetProps): Promise<IUser[]> => {
  const data = { email: author?.email };

  const response = await instance<IGetAllResponse>({
    method: "post",
    url: `/users/get?limit=${limit}`,
    data,
  });

  return response.data.users;
};

interface GetByIdResponse {
  user: IUser;
  message: string;
}

export const getById = async (
  id: number
): Promise<AxiosResponse<GetByIdResponse>> => {
  const response = await instance<GetByIdResponse>(`/users/get/${id}`);

  return response;
};

interface GetNonFriendUsersProps {
  id: number;
  limit: number;
  page: number;
}

interface GetNonFriendUsersResponse extends IDefaultResponse {
  users: IUser[];
}

export const getNonFriendUsers = async ({
  id,
  limit,
  page,
}: GetNonFriendUsersProps): Promise<IUser[]> => {
  const response = await instance.post<GetNonFriendUsersResponse>(
    "/users/get-non-friends",
    {
      id,
      limit,
      page,
    }
  );

  return response.data.users;
};
