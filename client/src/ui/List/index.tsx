import React from "react";

interface Props<Item> {
  list: Item[];
  renderItem: (item: Item, idx: number) => React.ReactNode;
}

const List = <Item,>({ list, renderItem }: Props<Item>) => {
  return <ul>{list.map(renderItem)}</ul>;
};

export default List;
