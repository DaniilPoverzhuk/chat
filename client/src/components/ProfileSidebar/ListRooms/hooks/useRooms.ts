import { useEffect } from "react";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { setRooms } from "@/lib/store/slices/room";

import * as RoomService from "@/service/room";

export default () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector((store) => store.user);
  const { data: rooms } = useAppSelector((store) => store.room);

  useEffect(() => {
    if (!author) return;

    (async () => {
      try {
        const rooms = await RoomService.getAll(author.id);

        dispatch(setRooms(rooms));
      } catch (_) {
        toast.error("При получении пользователей произошла ошибка");
      }
    })();
  }, [author]);

  return rooms;
};
