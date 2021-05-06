import { h, FunctionalComponent } from "preact";
import { Container, Text, BoxProps, Flex, Box, VStack } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export interface ScrollToActionContainerProps extends BoxProps {
  text: string;
}

export const ScrollToActionContainer: FunctionalComponent<ScrollToActionContainerProps> = (
  props
) => {
  const { text, children, ...rest } = props;

  const scrollToContent = () => {
    const nav = document.querySelector("#navigation");
    const navHeight = nav?.getBoundingClientRect().height ?? 0;
    window.scroll({
      top: window.innerHeight - navHeight,
      behavior: "smooth",
    });
  };

  return (
    <Container minH={"100vh"} {...rest} display={"flex"}>
      <Flex direction={"column"} justify={"space-between"} align={"center"}>
        <Box />
        {children}
        <VStack
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
    </Container>
  );
};
