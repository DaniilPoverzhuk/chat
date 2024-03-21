import instance from "@/axios";
import { AxiosResponse } from "axios";

interface InvitationFriendProps {
  user_id: number;
  friend_id: number;
}

interface InvitationFriendResponse {
  message: string;
}

export const invitationFriend = async (
  data: InvitationFriendProps
): Promise<AxiosResponse<InvitationFriendResponse>> => {
  const response = await instance.post("/notification/invitation-friend", data);

  return response;
};
