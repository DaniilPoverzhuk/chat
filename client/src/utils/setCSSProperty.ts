interface Props<T> {
  dom: T;
  property: string;
  value: string;
}

export default <T extends HTMLElement | SVGSVGElement>({
  dom,
  property,
  value,
}: Props<T>) => dom.style.setProperty(property, value);
