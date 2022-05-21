import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { BackCloudLayer } from "./components/BackCloudLayer";
import { DudeOnMountainLayer } from "./components/DudeOnMountain";
import { FrontCloudLayer } from "./components/FrontCloudLayer";
import { TextLayer } from "./components/TextLayer";
import { useNavbarHeight } from "../..";

export const HomeParallax: FC = () => {
  const navbarHeight = useNavbarHeight();
  const fullWithoutNavbar = `calc(100vh - ${navbarHeight}px)`;

  return (
    <Box height={fullWithoutNavbar} w={"full"}>
      <TextLayer />
      <BackCloudLayer />
      <DudeOnMountainLayer />
      <FrontCloudLayer />
    </Box>
  );
};
