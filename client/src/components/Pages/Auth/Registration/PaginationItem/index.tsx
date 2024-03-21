import styles from "./index.module.scss";

interface Props {
  src: string;
  onClick: (src: string) => void;
}

const PaginationItem = ({ src, onClick }: Props) => {
  return (
    <button
      type="button"
      onClick={() => onClick(src)}
      className={styles.listItemAvatar}
      style={{ display: "flex" }}
    >
      <img src={src} width={"100%"} />
    </button>
  );
};

export default PaginationItem;
