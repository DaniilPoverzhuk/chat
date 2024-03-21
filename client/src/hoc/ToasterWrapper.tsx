import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ToasterWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      {createPortal(<ToastContainer />, document.body)}
    </>
  );
};

export default ToasterWrapper;
