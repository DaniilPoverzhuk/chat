interface Props {
  dom: Element;
  property: any;
  type: "number" | "string";
}

export default <T>({ dom, property, type }: Props): T => {
  const getElement = () => window.getComputedStyle(dom)[property];

  if (type === "string") return getElement() as T;

  return +getElement().slice(0, -2) as T;
};
