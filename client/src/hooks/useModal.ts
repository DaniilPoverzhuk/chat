import { useCallback, useState } from "react";

interface Response {
  isVisible: boolean;
  closeModal: () => void;
  showModal: () => void;
}

export default (defaultVisibility: boolean = false): Response => {
  const [isVisible, setVisible] = useState<boolean>(defaultVisibility);

  const showModal = useCallback(() => {
    setVisible(!isVisible);
  }, []);

  const closeModal = useCallback(() => {
    setVisible(false);
  }, []);

  return {
    isVisible,
    showModal,
    closeModal,
  };
};
