import { AxiosResponse } from "axios";
import axios from "@/axios";

import { IRoom } from "@/lib/store/slices/room";

interface GetProps {
  senderId: number;
  getterId: number;
}

interface GetResponse {
  room: IRoom;
  message: string;
}

export const get = async (
  data: GetProps
): Promise<AxiosResponse<GetResponse>> => {
  const response = await axios<GetResponse>({
    method: "post",
    url: "/rooms/get",
    data,
  });

  console.log(response);

  return response;
};
