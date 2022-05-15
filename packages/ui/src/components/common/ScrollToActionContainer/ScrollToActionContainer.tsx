import { FunctionalComponent, h } from "preact";
import { Box, BoxProps, Flex, Text, VStack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import { useNavbarHeight } from "..";

export interface ScrollToActionContainerProps extends BoxProps {
  text: string;
  overlapContent?: boolean;
}

export const ScrollToActionContainer: FunctionalComponent<
  ScrollToActionContainerProps
> = (props) => {
  const { text, children, overlapContent = false, ...rest } = props;

  const selfRef = useRef<HTMLDivElement>(null);
  const navbarHeight = useNavbarHeight();

  const scrollToContent = () => {
    const selfHeight = selfRef.current?.getBoundingClientRect().height ?? 0;

    window.scroll({
      top: selfHeight - navbarHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box minH={"100vh"} {...rest} display={"flex"} ref={selfRef}>
      <Flex
        w={"full"}
        direction={"column"}
        justify={"space-between"}
        align={"center"}
        pt={navbarHeight}
        position={overlapContent ? "relative" : undefined}
      >
        <Box />
        {children}
        <VStack
          position={overlapContent ? "absolute" : undefined}
          bottom={0}
          color={"brand.800"}
          cursor={"pointer"}
          onClick={scrollToContent}
          mb={3}
        >
          <Text textTransform={"uppercase"} fontSize={"xs"}>
            {text}
          </Text>
          <ChevronDownIcon boxSize={6} />
        </VStack>
      </Flex>
    </Box>
  );
};
