import React, { ChangeEvent, useRef } from "react";

import styles from "./index.module.scss";

import IconPlus from "@/components/icons/Plus";

interface Props {
  onClick: (src: string) => void;
}

const PaginationInputFile: React.FC<Props> = ({ onClick }) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;

    onClick(input.files?.item(0)!.name!);
  };

  return (
    <li className={styles.root}>
      <input type="file" onChange={onChangeHandler} />
      <IconPlus color="#EBEBEB" />
    </li>
  );
};

export default PaginationInputFile;
