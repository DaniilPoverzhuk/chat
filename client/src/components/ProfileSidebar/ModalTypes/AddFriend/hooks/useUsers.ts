import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAppSelector } from "@/lib/store";

import { IFriendRequest } from "@/service/friend";
import { IUser } from "@/types";

import * as UserService from "@/service/user";
import * as FriendService from "@/service/friend";

const LIMIT_USERS = 10;

export default (search: string) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [idsUsersSendFriendRequests, setIdsUsersSendFriendRequests] = useState<
    number[]
  >([]);
  const { author } = useAppSelector((store) => store.user);

  const onDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const isSendFriendRequest = (id: number) =>
    idsUsersSendFriendRequests.includes(id);

  const getIdsUsersSendFriendRequest = (friendRequests: IFriendRequest[]) =>
    friendRequests.map((friendRequest) => friendRequest.getter_id);

  useEffect(() => {
    if (!author) return;

    (async () => {
      try {
        const users = await UserService.getNonFriendUsers({
          id: author.id,
          limit: LIMIT_USERS,
          page: 1,
        });
        const friendRequests = await FriendService.getFriendRequests({
          id: author?.id,
        });
        const ids = getIdsUsersSendFriendRequest(friendRequests);

        setIdsUsersSendFriendRequests(ids);
        setUsers((prev) => [...prev, ...users]);
      } catch (err) {
        toast.error("При получении пользователей произошла ошибка :(");
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.username.includes(search)));
  }, [users, search]);

  useEffect(() => {
    if (!users.length) {
      return setError("Нет пользователей");
    }

    if (!filteredUsers.length) {
      return setError("Такой пользователь не найден");
    }

    setError("");
  }, [users, filteredUsers]);

  return { users: filteredUsers, isSendFriendRequest, onDeleteUser, error };
};
