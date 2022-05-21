import { FC } from "react";
import { useRef, useState } from "react";
import { Box, Image, useBreakpointValue } from "@chakra-ui/react";
import { useIsomorphicLayoutEffect, useWindowSize } from "react-use";
import { getImageDimensions } from "./common";

import * as Images from "../assets";

export const DudeOnMountainLayer: FC = () => {
  const imageTopOffset = 45; //vh
  const imageLeftOffset = 8; //% of the screen additional pull to the left

  const [{ scale, leftOffset }, setCalculatedBackgroundProperties] = useState({
    scale: 0,
    leftOffset: 0,
  });

  const displayedFraction = useBreakpointValue([0.6, 0.6, 0.7, 0.8, 1]) ?? 0.6;

  const fractionRef = useRef(displayedFraction);
  fractionRef.current = displayedFraction;

  const windowSize = useWindowSize();

  // When dependencies change
  useIsomorphicLayoutEffect(() => {
    getImageDimensions(Images.dudeWebp).then(({ height, width }) => {
      if (displayedFraction !== fractionRef.current) {
        return;
      }

      const imageFractionHeight = height * fractionRef.current;
      const displayedHeight =
        windowSize.height * ((100 - imageTopOffset) / 100);
      const scale = displayedHeight / imageFractionHeight;

      const windowWidth = windowSize.width;

      const centerOffset = (width - windowWidth) / 2;
      const pullLeftOffset = windowWidth * (imageLeftOffset / 100);

      const props = {
        scale,
        leftOffset: centerOffset + pullLeftOffset,
      };

      setCalculatedBackgroundProperties(props);
    });
  }, [displayedFraction, windowSize]);

  return (
    <Box
      transform={`scale(${scale})`}
      position={"fixed"}
      top={0}
      overflow={"visible"}
      zIndex={-200}
      height={"100vh"}
      width={"100vw"}
    >
      <Image
        maxWidth={"unset"}
        borderRadius={0}
        position={"absolute"}
        src={Images.dudeWebp}
        fallbackSrc={Images.dudePng}
        left={-leftOffset}
        top={`${imageTopOffset}vh`}
      />
    </Box>
  );
};
