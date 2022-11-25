import { FC } from "react";
import { Box, Image } from "@chakra-ui/react";
import * as Images from "../assets";

export const BackCloudLayer: FC = () => {
  return (
    <Box position={"absolute"} zIndex={-300} left={"-35vw"}>
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
