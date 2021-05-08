import { h, FunctionalComponent } from "preact";
import { Text, BoxProps, Flex, Box, VStack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export interface ScrollToActionContainerProps extends BoxProps {
  text: string;
  overlapContent?: boolean;
}

export const ScrollToActionContainer: FunctionalComponent<ScrollToActionContainerProps> = (
  props
) => {
  const { text, children, overlapContent = false, ...rest } = props;

  const scrollToContent = () => {
    const nav = document.querySelector("#navigation");
    const navHeight = nav?.getBoundingClientRect().height ?? 0;
    window.scroll({
      top: window.innerHeight - navHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box minH={"100vh"} {...rest} display={"flex"}>
      <Flex
        w={"full"}
        direction={"column"}
        justify={"space-between"}
        align={"center"}
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
