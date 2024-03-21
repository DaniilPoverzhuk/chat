import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import * as FriendService from "@/service/friend";
import * as RoomService from "@/service/room";
import * as UserService from "@/service/user";

import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import Author from "@/components/ProfileSidebar/Author";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setRoom } from "@/lib/store/slices/room";

import ToasterWrapper from "@/hoc/ToasterWrapper";

import { IFriendRequest } from "@/service/friend";
import { IUser } from "@/types";

import useSocket from "@/hooks/useSocket";

const Profile = () => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const { author } = useAppSelector((store) => store.user);
  const [usersSendFriendRequest, setUsersSendFriendRequest] = useState<IUser[]>(
    []
  );

  const getIdsUsersSenderFriendRequests = (friendRequests: IFriendRequest[]) =>
    friendRequests.map((friendRequest) => friendRequest.sender_id);

  const getUsersByIds = async (ids: number[]) =>
    await Promise.all(
      ids.map(async (id) => (await UserService.getById(id)).data.user)
    );

  const addFriend = async (friendId: number) => {
    try {
      await FriendService.add({ user_id: author.id, friend_id: friendId });

      const response = await RoomService.create({
        authorId: author.id,
        users: [author.id, friendId],
      });
      const room = response.data.room;

      dispatch(setRoom(room));
      setUsersSendFriendRequest(
        usersSendFriendRequest.filter((user) => user.id !== friendId)
      );

      socket.emit("friend:result-friend-request", {
        isAccepted: true,
        sender_id: friendId,
        getter_id: author.id,
        room,
      });
    } catch (err) {
      toast.error("При добавлении друга произошла ошибка :(");
    }
  };

  useEffect(() => {
    if (!author) return;

    (async () => {
      try {
        const friendRequests = await FriendService.getFriendRequests({
          id: author.id,
          orderBy: "getter_id",
        });
        const ids = getIdsUsersSenderFriendRequests(friendRequests);
        const users = await getUsersByIds(ids);

        setUsersSendFriendRequest(users);
      } catch (_) {
        toast.error("При получении уведомлений произошла ошибка :(");
      }
    })();
  }, [author]);

  useEffect(() => {
    if (!author) return;

    socket.on(`friend:get-friend-request-${author.id}`, (user: IUser) => {
      setUsersSendFriendRequest([user, ...usersSendFriendRequest]);
    });
  }, [socket, author]);

  return (
    <ToasterWrapper>
      <Box>
        <Author />
        <Accordion>
          <ListItemButton sx={{ width: "100%", padding: "0 10px" }}>
            <AccordionSummary
              sx={{
                width: "100%",
                padding: "0",
              }}
            >
              <Box display={"flex"} width={"100%"} gap={1}>
                <NotificationsIcon sx={{ color: "#bebebe" }} />
                <Typography color={"#bebebe"}>Уведомления</Typography>
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"flex-end"}
                >
                  {Boolean(usersSendFriendRequest.length) && (
                    <Box
                      sx={{ backgroundColor: "#257BD0" }}
                      width={"25px"}
                      height={"25px"}
                      borderRadius="100%"
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography
                        component={"span"}
                        fontSize={"14px"}
                        color={"#fff"}
                      >
                        {usersSendFriendRequest.length}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Box>
            </AccordionSummary>
          </ListItemButton>
          <AccordionDetails sx={{ padding: 0 }}>
            <List sx={{ position: "relative", padding: "20px 0" }}>
              {usersSendFriendRequest.length ? (
                usersSendFriendRequest.map((user) => (
                  <ListItem key={user.id} disablePadding>
                    <ListItemButton>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        width={"100%"}
                      >
                        <Box display={"flex"} alignItems={"center"} gap={2}>
                          <img
                            width={60}
                            height={60}
                            src={user.avatar}
                            alt="avatar"
                          />
                          <Typography>{user.username}</Typography>
                        </Box>
                        <Box display={"flex"} alignItems={"center"}>
                          <IconButton
                            color="success"
                            onClick={() => addFriend(user.id)}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton color="error">
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                ))
              ) : (
                <Typography
                  position={"absolute"}
                  left={"50%"}
                  top={"50%"}
                  sx={{ transform: "translate(-50%, -50%)" }}
                >
                  Уведомлений нет
                </Typography>
              )}
            </List>
          </AccordionDetails>
        </Accordion>
      </Box>
    </ToasterWrapper>
  );
};

export default Profile;
