import { FunctionalComponent, h } from "preact";
import { Box, Image } from "@chakra-ui/react";
import * as Images from "../assets";

export const BackCloudLayer: FunctionalComponent = () => {
  return (
    <Box position={"absolute"} zIndex={-300} left={"-35vw"} overflow={"hidden"}>
      <Image
        borderRadius={0}
        src={Images.cloudBigWebp}
        fallbackSrc={Images.cloudBigPng}
        objectFit={"cover"}
        position={"relative"}
        bottom={-200}
      />
    </Box>
  );
};
