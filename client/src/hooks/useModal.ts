import { useState } from "react";

interface Response {
  isVisible: boolean;
  closeModal: () => void;
  showModal: () => void;
}

export default (defaultVisibility: boolean = false): Response => {
  const [isVisible, setVisible] = useState<boolean>(defaultVisibility);

  const showModal = () => {
    setVisible(!isVisible);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return {
    isVisible,
    showModal,
    closeModal,
  };
};
