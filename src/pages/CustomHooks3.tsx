import { useHover } from "../hooks/useHover";

export const CustomHooks3 = () => {
  const { hovered, ref } = useHover<HTMLDivElement>();

  return (
    <div ref={ref}>
      {hovered ? "На меня навели мышку" : "Наведи мышкой на меня"}
    </div>
  );
};

