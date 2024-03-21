import React, { useMemo, useState } from "react";

import { Box, Grid, ListItemButton } from "@mui/material";

import Author from "./Author";
import Button from "./Button";
import AddFriend from "./ModalTypes/AddFriend";
import AddCommunity from "./ModalTypes/AddCommunity";
import Profile from "./ModalTypes/Profile";

import Modal from "@/ui/Modal";

import useModal from "@/hooks/useModal";

type TypeModal = "community" | "friend" | "profile";

interface PropsModalComponent {
  closeModalHandler: () => void;
}

type IModalComponent = {
  [key in TypeModal]: React.FC<PropsModalComponent>;
};

const ModalComponents: IModalComponent = {
  community: AddCommunity,
  friend: AddFriend,
  profile: Profile,
};

const Sidebar: React.FC = () => {
  const { isVisible, showModal, closeModal } = useModal();
  const [currentTypeModal, setCurrentTypeModal] = useState<TypeModal | "">("");
  const ModalContent = useMemo(
    () => currentTypeModal && ModalComponents[currentTypeModal],
    [currentTypeModal]
  );

  const showModalHandler = (type: TypeModal) => {
    showModal();
    setCurrentTypeModal(type);
  };

  const closeModalHandler = () => {
    closeModal();
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={closeModalHandler}>
        {ModalContent && <ModalContent closeModalHandler={closeModalHandler} />}
      </Modal>
      <Box display={"flex"} flexDirection={"column"} gap={1}>
        <ListItemButton onClick={() => showModalHandler("profile")}>
          <Author />
        </ListItemButton>
      </Box>
      <Grid container display={"grid"} gridTemplateColumns={"1fr 1fr"}>
        <Grid item>
          <Button
            label="Создать группу"
            onClick={() => showModalHandler("community")}
          />
        </Grid>
        <Grid item>
          <Button
            label="Добавить друга"
            onClick={() => showModalHandler("friend")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Sidebar;
