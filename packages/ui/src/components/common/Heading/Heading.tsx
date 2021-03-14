import { h, FunctionalComponent } from "preact";
import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
  Center,
} from "@chakra-ui/react";

export type HeadingSize = "h1" | "h2";

export interface HeadingProps extends ChakraHeadingProps {
  frontText: string;
  blueText?: string;
  backText?: string;
  size?: HeadingSize;
}

const headingSizeToFontSize: Record<HeadingSize, string[]> = {
  h1: ["4xl", "5xl", "8vw", "6vw"],
  h2: ["3xl", "4xl", "6xl"],
};

export const Heading: FunctionalComponent<HeadingProps> = ({
  frontText,
  blueText,
  backText,
  size = "h1",
  ...args
}) => {
  const patchedProps: ChakraHeadingProps = {
    as: size,
    textAlign: "center",
    fontSize: headingSizeToFontSize[size],
    color: "gray.800",
    ...args,
  };
  return (
    <Center>
      <ChakraHeading {...patchedProps}>
        {frontText}
        <ChakraHeading {...patchedProps} display={"inline"} color={"brand.800"}>
          {blueText ?? ""}
        </ChakraHeading>
        {backText ?? ""}
      </ChakraHeading>
    </Center>
  );
};
