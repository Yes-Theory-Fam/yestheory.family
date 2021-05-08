import { h, FunctionalComponent } from "preact";
import {
  Heading as ChakraHeading,
  HeadingProps as ChakraHeadingProps,
  Center,
  useBreakpointValue,
  useTheme,
} from "@chakra-ui/react";

export type HeadingSize = "h1" | "h2";

export interface HeadingProps extends ChakraHeadingProps {
  frontText: string;
  blueText?: string;
  backText?: string;
  size?: HeadingSize;
  maxFontSize?: number;
  center?: boolean;
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
  maxFontSize,
  center = true,
  ...args
}) => {
  const fontSize = headingSizeToFontSize[size];
  const patchedProps: ChakraHeadingProps = {
    as: size,
    fontSize,
    color: "gray.800",
    ...args,
  };

  const chakraFontSize = useBreakpointValue(fontSize);
  const { fontSizes } = useTheme();

  if (maxFontSize && chakraFontSize) {
    const calculatedFontSize = fontSizes[chakraFontSize] ?? chakraFontSize;
    patchedProps.fontSize = `min(${maxFontSize}px, ${calculatedFontSize})`;
  }

  if (center) {
    patchedProps.textAlign = "center";
  }

  const heading = (
    <ChakraHeading {...patchedProps}>
      {frontText}
      {frontText.endsWith("\n") && <br />}
      <ChakraHeading {...patchedProps} display={"inline"} color={"brand.800"}>
        {blueText ?? ""}
      </ChakraHeading>
      {backText ?? ""}
    </ChakraHeading>
  );

  return center ? <Center>{heading}</Center> : heading;
};
