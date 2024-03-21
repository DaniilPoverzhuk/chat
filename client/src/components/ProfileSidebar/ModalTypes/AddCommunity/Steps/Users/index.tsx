import React, { FormEvent, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import styles from "./index.module.scss";

import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";

import List from "@/ui/List";

import CreateGroupContext from "@/context/create-group";

import { IUser } from "@/types";
import isExists from "@/utils/isExists";

import * as UserService from "@/service/user";

const Users: React.FC = () => {
  const { setLoading, isLoading, setData, data, changeStepHandler, onSubmit } =
    useContext(CreateGroupContext)!;
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const onSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setData((prev) => {
      return {
        ...prev,
        users: selectedUsers,
      };
    });
  };

  const onClickUserHandler = (selectedUser: IUser) => {
    const isExists = selectedUsers.find((user) => user.id === selectedUser.id);

    !isExists
      ? setSelectedUsers([...selectedUsers, selectedUser])
      : setSelectedUsers(
          selectedUsers.filter((user) => user.id !== selectedUser.id)
        );
  };

  useEffect(() => {
    if (!data.users.length) return;

    setLoading(true);

    const timeout = setTimeout(() => {
      onSubmit();
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, [data]);

  useEffect(() => {
    (async () => {
      try {
        const response = await UserService.getAll();

        setUsers(response.data.users);
      } catch (err) {
        // toast.error("При получении пользователей произошла ошибка :(");
      }
    })();
  }, []);

  ("render users");

  return (
    <>
      <Box
        component={"form"}
        display={"flex"}
        flexDirection={"column"}
        gap={2}
        onSubmit={onSubmitHandler}
      >
        <TransitionGroup>
          <List
            flex={{ gap: 10 }}
            list={selectedUsers}
            renderItem={(user) => (
              <CSSTransition key={user.id} timeout={400}>
                <ListItem
                  disablePadding
                  className={styles.selectedUser}
                  sx={{
                    display: "inline-block",
                    width: "auto",
                    backgroundColor: "#f5f5f5",
                    borderRadius: "10px",
                  }}
                >
                  <ListItemButton>
                    <Box display={"flex"} alignItems={"center"} gap={1}>
                      <img
                        width={"30px"}
                        height={"30px"}
                        src={user.avatar}
                        alt="user-avatar"
                      />
                      <Typography component={"p"}>{user.username}</Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              </CSSTransition>
            )}
          />
        </TransitionGroup>
        <List
          list={users}
          renderItem={(user) => (
            <ListItem
              key={user.id}
              disablePadding
              onClick={() => onClickUserHandler(user)}
            >
              <ListItemButton selected={isExists(selectedUsers, user, "id")}>
                <Box display={"flex"} alignItems={"center"} gap={1.5}>
                  <img
                    width={"60px"}
                    height={"60px"}
                    src={user.avatar}
                    alt="user-avatar"
                  />
                  <Typography component={"p"}>{user.username}</Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          )}
        ></List>
        <Box display={"flex"} gap={2}>
          <Button variant="contained" onClick={() => changeStepHandler("prev")}>
            Назад
          </Button>
          <LoadingButton
            loading={isLoading}
            sx={{ alignSelf: "flex-start" }}
            variant="contained"
            type="submit"
          >
            Создать группу
          </LoadingButton>
        </Box>
      </Box>
      {/* <ToastContainer /> */}
    </>
  );
};

export default Users;
