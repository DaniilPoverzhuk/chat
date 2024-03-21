import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Box } from "@mui/material";

import CreateGroup, { IData } from "@/context/create-group";

import * as ChatService from "@/service/chat";

import Name from "./Steps/Name";
import Users from "./Steps/Users";

const components: { [key: number]: ComponentType } = {
  0: Name,
  1: Users,
};

const defaultData: IData = { name: "", users: [] };

type TypeStep = "prev" | "next";

interface Props {
  closeModalHandler: () => void;
}

const AddGroup: React.FC<Props> = ({ closeModalHandler }) => {
  const [step, setStep] = useState<number>(0);
  const [data, setData] = useState<IData>(defaultData);
  const [isLoading, setLoading] = useState<boolean>(false);
  const Component = useMemo(() => components[step], [step]);

  const onSubmit = async () => {
    try {
      const response = await ChatService.createCommunity(data);

      toast.success("Группа успешно создана");
    } catch (err) {
      toast.error("При создании группы произошла ошибка :(");
    }
  };

  const changeStepHandler = (type: TypeStep = "next") => {
    setStep((prev) => {
      if (type === "next" && prev !== 1) {
        return prev + 1;
      }

      if (type === "prev" && prev) {
        return prev - 1;
      }

      return prev;
    });
  };

  return (
    <>
      <Box>
        <CreateGroup.Provider
          value={{
            setData,
            data,
            setLoading,
            isLoading,
            changeStepHandler,
            onSubmit,
          }}
        >
          <Component />
        </CreateGroup.Provider>
      </Box>
      {createPortal(<ToastContainer />, document.body)}
    </>
  );
};

export default AddGroup;
