import React from "react";

type TypeDirection = "row" | "column" | "row-reverse" | "column-reverse";

type TypeAlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

interface Props<Item> {
  list: Item[];
  renderItem: (item: Item, idx: number) => React.ReactNode;
  flex?: {
    flexDirection?: TypeDirection;
    alignItems?: TypeAlignItems;
    gap?: number;
  };
  grid?: {
    gridTemplateColumns?: string;
    gap?: number;
    rowGap?: number;
  };
  component?: React.ReactNode;
  children?: React.ReactNode;
}

const List = <Item,>({ list, renderItem, flex, grid }: Props<Item>) => {
  const getStyles = () => {
    const styles = {} as { [key: string]: any };

    if (flex) {
      return (styles.flex = { display: "flex", ...flex });
    }

    if (grid) {
      return (styles.grid = { display: "grid", ...grid });
    }
  };

  return <ul style={getStyles()}>{list.map(renderItem)}</ul>;
};

export default List;
