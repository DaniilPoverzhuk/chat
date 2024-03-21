import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "@/lib/store";
import useFetch from "@/hooks/useFetch";
import useSocket from "@/hooks/useSocket";
import { IDefaultResponse, IUser } from "@/types";

interface Response {
  isOnline: boolean;
  friend: IUser | undefined;
}

interface FetchResponse extends IDefaultResponse {
  user: IUser;
}

interface IOnlineUser {
  [key: string]: string;
}

export default (users: number[]): Response => {
  const socket = useSocket();
  const [isOnline, setOnline] = useState<boolean>(false);
  const { author } = useAppSelector((store) => store.user);
  const friendId = useMemo(
    () => users.find((user) => author.id !== user),
    [users, author]
  );
  const { result } = useFetch<FetchResponse>({ url: `/users/get/${friendId}` });

  useEffect(() => {
    if (!friendId) return;

    socket.on(`user:get-online-status`, (onlineUsers: IOnlineUser[]) => {
      setOnline(!!onlineUsers[friendId]);
    });
  }, [friendId, socket]);

  return { isOnline, friend: result?.user };
};
