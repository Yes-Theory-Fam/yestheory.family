import { h, FunctionalComponent } from "preact";
import { Text } from "@chakra-ui/react";

export const Copyright: FunctionalComponent = () => (
  <Text fontSize={"sm"} color={"gray.600"} textTransform={"uppercase"}>
    &copy; YesTheoryFam {new Date().getFullYear()}
  </Text>
);
