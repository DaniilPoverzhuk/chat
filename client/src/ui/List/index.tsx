import React, { HTMLAttributes } from "react";
import type { PropsWithChildren } from "react";

type Extends = HTMLAttributes<HTMLUListElement> & PropsWithChildren;

interface Props<Item> extends Extends {
  list: Item[];
  renderItem: (item: Item, idx: number) => React.ReactNode;
  styles?: React.CSSProperties;
}

const List = <Item,>({ list, renderItem, styles, className }: Props<Item>) => {
  return (
    <ul className={className} style={styles}>
      {list.map(renderItem)}
    </ul>
  );
};

export default List;
