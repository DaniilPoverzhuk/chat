import instance from "@/axios";
import { ICommunity, IUser } from "@/types";
import { AxiosResponse } from "axios";

interface CreateCommunityResponse {
  message: string;
  community: ICommunity;
}

interface CreateCommunityProps {
  name: string;
  users: IUser[];
}

export const createCommunity = async ({
  name,
  users,
}: CreateCommunityProps): Promise<AxiosResponse<CreateCommunityResponse>> => {
  const response = await instance({
    method: "post",
    url: "/createCommunity",
    data: { name, users },
  });

  return response;
};
