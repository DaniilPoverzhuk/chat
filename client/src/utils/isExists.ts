export default <Item>(array: Item[], target: Item, property?: keyof Item) => {
  if (property) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][property] === target[property]) {
        return true;
      }
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return true;
      }
    }
  }
  return false;
};
