import React, { ChangeEvent } from "react";
import styles from "./index.module.scss";

import IconPlus from "@/components/icons/Plus";

interface Props {
  onClick: (file: File) => void;
}

const PaginationInputFile: React.FC<Props> = ({ onClick }) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    if (input) {
      onClick(input.files?.item(0)!);
    }
  };

  return (
    <div className={styles.root}>
      <input type="file" onChange={onChangeHandler} />
      <IconPlus color="#EBEBEB" />
    </div>
  );
};

export default PaginationInputFile;
