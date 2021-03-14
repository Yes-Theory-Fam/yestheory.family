import { FunctionalComponent, h } from "preact";
import { Center, Text } from "@chakra-ui/react";
import { fullWidth } from "./common";

export const TextLayer: FunctionalComponent = () => (
  <Center
    position={"fixed"}
    height={"100vh"}
    top={0}
    zIndex={-400}
    {...fullWidth}
  >
    <Text
      color={"brand.800"}
      fontSize={["9xl", "10rem", "70vh"]}
      textTransform={"uppercase"}
      fontWeight={"black"}
    >
      Yes
    </Text>
  </Center>
);
