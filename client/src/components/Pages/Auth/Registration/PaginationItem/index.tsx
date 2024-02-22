import styles from "./index.module.scss";

import { Grid } from "@mui/material";
import { ID } from "@/types";

interface Props extends ID {
  src: string;
  onClick: (src: string) => void;
}

const PaginationItem = ({ src, onClick }: Props) => {
  return (
    <li>
      <Grid item xs={4} display={"flex"} justifyContent={"center"}>
        <button
          type="button"
          onClick={() => onClick(src)}
          className={styles.listItemAvatar}
          style={{ display: "flex" }}
        >
          <img src={src} width={"100%"} />
        </button>
      </Grid>
    </li>
  );
};

export default PaginationItem;
