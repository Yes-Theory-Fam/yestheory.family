import { FC } from "react";
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use";
import { Box, Image } from "@chakra-ui/react";
import * as Images from "../assets";
import { useRef, useState } from "react";
import { fullWidth, Positioned } from "./common";
import { useNavbarHeight } from "../../..";

interface FrontCloudProps {
  src: string;
  fallbackSrc: string;
  positioned?: Positioned;
}

const SmallFrontCloud: FC<FrontCloudProps> = ({ positioned, ...props }) => {
  return (
    <Box position={"absolute"} overflow={"hidden"} {...positioned}>
      <Image borderRadius={0} width={"full"} position={"relative"} {...props} />
    </Box>
  );
};

const BigFrontCloud: FC<FrontCloudProps> = ({ positioned, ...props }) => {
  const bigCloudRef = useRef<HTMLImageElement>(null);
  const size = useWindowSize();
  const [state, setState] = useState({ bottom: 0, left: 0 });
  useIsomorphicLayoutEffect(() => {
    const img = bigCloudRef.current;
    if (!img) return;
    setState({ bottom: img.height * -0.3, left: img.width * 0.1 });
  }, [bigCloudRef, size]);

  return (
    <Box position={"absolute"} overflow={"hidden"} {...positioned}>
      <Image
        ref={bigCloudRef}
        borderRadius={0}
        width={"full"}
        position={"relative"}
        bottom={state.bottom}
        left={state.left}
        {...props}
      />
    </Box>
  );
};

export const FrontCloudLayer: FC = () => {
  const bottom = { ...fullWidth, bottom: 0 };
  const navbarHeight = useNavbarHeight();
  const fullWithoutNavbar = `calc(100vh - ${navbarHeight}px)`;

  return (
    <Box
      height={fullWithoutNavbar}
      position={"relative"}
      overflow={"hidden"}
      zIndex={-100}
      bottom={0}
      {...fullWidth}
    >
      <BigFrontCloud
        positioned={bottom}
        src={Images.cloudBigWebp}
        fallbackSrc={Images.cloudBigPng}
      />
      <BigFrontCloud
        positioned={bottom}
        src={Images.cloudBigWebp}
        fallbackSrc={Images.cloudBigPng}
      />
      <SmallFrontCloud
        src={Images.cloudBotWebp}
        fallbackSrc={Images.cloudBotPng}
        positioned={bottom}
      />
      <SmallFrontCloud
        src={Images.cloudBotWebp}
        fallbackSrc={Images.cloudBotPng}
        positioned={bottom}
      />
    </Box>
  );
};
