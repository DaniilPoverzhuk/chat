import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import { ListItem, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useAppDispatch, useAppSelector } from "@/lib/store";

import useSocket from "@/hooks/useSocket";

import * as FriendService from "@/service/friend";

import { IRoom, IUser } from "@/types";
import { setRoom } from "@/lib/store/slices/room";

type TypesStateButton = "isAccepted" | "isSendFriendRequest";

type TypeTextButton = "Принята" | "Откланена" | "Отправлена" | "Добавить";

type TypeStylesButton = "outlined" | "contained";

type TypeKeyButtonDataItem = "true" | "false";

interface ICurrentButtonData {
  text: TypeTextButton;
  variant: TypeStylesButton;
}

type TypeButtonDataItem = {
  [key in TypeKeyButtonDataItem]: ICurrentButtonData;
};

type TypeButtonData = {
  [key in TypesStateButton]: TypeButtonDataItem;
};

const ButtonData: TypeButtonData = {
  isAccepted: {
    true: {
      text: "Принята",
      variant: "outlined",
    },
    false: {
      text: "Откланена",
      variant: "outlined",
    },
  },
  isSendFriendRequest: {
    true: {
      text: "Отправлена",
      variant: "outlined",
    },
    false: {
      text: "Добавить",
      variant: "contained",
    },
  },
};

interface Props extends IUser {
  isSendFriendRequest: boolean;
  onDeleteUser: (id: number) => void;
}

const User: React.FC<Props> = ({
  id,
  avatar,
  username,
  isSendFriendRequest,
  onDeleteUser,
}) => {
  const socket = useSocket();
  const dispatch = useAppDispatch();
  const author = useAppSelector((store) => store.user.author);
  const defaultButtonData = useMemo(
    () =>
      ButtonData["isSendFriendRequest"][
        isSendFriendRequest.toString() as TypeKeyButtonDataItem
      ],
    []
  );
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDisabed, setDisabled] = useState<boolean>(isSendFriendRequest);
  const [currentButtonData, setCurrentButtonData] =
    useState<ICurrentButtonData>(defaultButtonData);

  const setButtonDataHandler = (
    type: TypesStateButton,
    state: TypeKeyButtonDataItem
  ) => {
    setCurrentButtonData(ButtonData[type][state]);
  };

  const friendRequest = async (friend_id: number) => {
    setLoading(true);

    try {
      const data = { sender_id: author.id, getter_id: friend_id };

      await FriendService.sendFriendRequest(data);
      socket.emit("friend:friend-request", data);

      setTimeout(() => {
        setDisabled(true);
        setButtonDataHandler("isSendFriendRequest", "true");
        toast.success("Заявка успешно отправлена");
      }, 1000);
    } catch (err) {
      toast.error("При отправке заявки в друзья произошла ошибка :(");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (!socket || !author) return;

    socket.on(
      `friend:get-response-friend-request-${author.id}-${id}`,
      ({ isAccepted, room }: { isAccepted: boolean; room: IRoom }) => {
        setDisabled(true);

        if (isAccepted) {
          setButtonDataHandler("isAccepted", "true");

          setTimeout(() => {
            dispatch(setRoom(room));
            onDeleteUser(id);
          }, 2000);
        } else {
          setButtonDataHandler("isAccepted", "false");

          setTimeout(() => {
            setButtonDataHandler("isSendFriendRequest", "false");
            setDisabled(false);
          }, 2000);
        }
      }
    );
  }, [socket, author]);

  return (
    <ListItem disablePadding>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={2}
        sx={{ width: "100%" }}
      >
        <img src={avatar} width={60} height={60} alt="avatar" />
        <Typography component={"p"}>{username}</Typography>
        <LoadingButton
          onClick={() => friendRequest(id)}
          loading={isLoading}
          disabled={isDisabed}
          variant={currentButtonData.variant}
          sx={{ marginLeft: "auto" }}
        >
          {currentButtonData.text}
        </LoadingButton>
      </Box>
    </ListItem>
  );
};

export default User;
