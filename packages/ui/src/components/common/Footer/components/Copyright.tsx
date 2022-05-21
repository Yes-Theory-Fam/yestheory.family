import { FC } from "react";
import { Text } from "@chakra-ui/react";

export const Copyright: FC = () => (
  <Text fontSize={"sm"} color={"gray.600"} textTransform={"uppercase"}>
    &copy; YesTheoryFam {new Date().getFullYear()}
  </Text>
);
