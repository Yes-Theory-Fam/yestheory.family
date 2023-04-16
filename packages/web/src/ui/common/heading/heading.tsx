import { createElement, FC, ReactNode } from "react";
import { VariantProp, variants } from "../../variants";

type DynamicProps = {
  elementName: string;
  children: ReactNode | ReactNode[];
} & Record<string, unknown>;

const Dynamic: FC<DynamicProps> = ({ elementName, children, ...props }) => {
  const childArray = Array.isArray(children) ? children : [children];

  return createElement(elementName, props, ...childArray);
};

const variant = variants(
  {
    h1: "text-4xl sm:text-5xl md:text-[8vw] lg:text-[6vw] my-6",
    h2: "text-3xl sm:text-4xl md:text-6xl my-4",
    h3: "text-xl sm:text-2xl md:text-3xl my-2",
    h4: "text-lg sm:text-xl md:text-2xl my-1",
    h5: "text-base sm:text-lg md:text-xl",
  },
  "h1"
);

export type HeadingProps = VariantProp<typeof variant, "size"> & {
  frontText: string;
  blueText?: string;
  backText?: string;
  className?: string;
  center?: boolean;
};

export const Heading: FC<HeadingProps> = ({
  frontText,
  blueText,
  backText,
  size = "h1",
  className,
  center = size === "h1",
}) => {
  return (
    <Dynamic
      elementName={size}
      className={variant(
        size,
        "text-gray-800 uppercase font-black",
        center && "text-center mx-auto",
        className
      )}
    >
      {frontText}
      {frontText.endsWith("\n") && <br />}
      <span className="text-brand-800">{blueText ?? ""}</span>
      {backText ?? ""}
    </Dynamic>
  );
};
