import { FC, ReactNode } from "react";
import { Button, VStack, useBreakpointValue, Link } from "@chakra-ui/react";
import { Heading, HeadingProps, OverrideComponentContext } from "../../";
import { useContext } from "react";

export interface HomeParagraphProps {
  heading: HeadingProps;
  paragraphs: ReactNode;
  buttonHref: string;
}

export const HomeParagraph: FC<HomeParagraphProps> = (props) => {
  const buttonSize: undefined | "sm" | "md" =
    useBreakpointValue(["sm", null, "md"]) ?? undefined;
  const { wrapLink } = useContext(OverrideComponentContext);

  return (
    <VStack align={"start"} spacing={6}>
      <Heading {...props.heading} textAlign={"left"} />
      <VStack spacing={4} align={"start"}>
        {props.paragraphs}
      </VStack>
      {wrapLink(
        <Button as={Link} variant={"outlined"} size={buttonSize}>
          Read more
        </Button>,
        props.buttonHref
      )}
    </VStack>
  );
};
