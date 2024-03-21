import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";

import { Box, Typography } from "@mui/material";

import List from "@/ui/List";

import Search from "@/components/ProfileSidebar/Search";
import User from "./User";

import { IUser } from "@/types";
import { IFriendRequest } from "@/service/friend";

import { useAppSelector } from "@/lib/store";

import * as UserService from "@/service/user";
import * as FriendService from "@/service/friend";

const AddFriend = () => {
  const LIMIT_USERS = useMemo(() => 10, []);
  const [search, setSearch] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [idsUsersReceivedFriendRequests, setIdsUsersReceivedFriendRequests] =
    useState<number[]>();
  const { author } = useAppSelector((store) => store.user);

  const setSearchHandler = debounce((value: string) => {
    setSearch(value);
  }, 300);

  const onChangeHandler = (value: string) => {
    setSearchHandler(value);
  };

  const onDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const getIdsUsersReceivedFriendRequest = (friendRequests: IFriendRequest[]) =>
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
        const ids = getIdsUsersReceivedFriendRequest(friendRequests);

        setIdsUsersReceivedFriendRequests(ids);
        setUsers((prev) => [...prev, ...users]);
      } catch (err) {
        toast.error("При получении пользователей произошла ошибка :(");
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => user.username.includes(search)));
  }, [users, search]);

  return (
    <div>
      <Search onChange={onChangeHandler} />
      <Box marginTop={3}>
        {!Boolean(filteredUsers.length) ? (
          <Typography>Такого пользователя нет :(</Typography>
        ) : (
          <List
            styles={{ display: "flex", flexDirection: "column", gap: "10px" }}
            list={filteredUsers}
            renderItem={(user) => (
              <User
                {...user}
                key={user.id}
                onDeleteUser={onDeleteUser}
                isSendFriendRequest={
                  idsUsersReceivedFriendRequests?.includes(user.id!)!
                }
              />
            )}
          />
        )}
      </Box>
    </div>
  );
};

export default AddFriend;
