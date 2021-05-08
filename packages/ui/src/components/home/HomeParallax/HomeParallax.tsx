import { FunctionalComponent, h } from "preact";
import { Box } from "@chakra-ui/react";
import { BackCloudLayer } from "./components/BackCloudLayer";
import { DudeOnMountainLayer } from "./components/DudeOnMountain";
import { FrontCloudLayer } from "./components/FrontCloudLayer";
import { TextLayer } from "./components/TextLayer";

export const HomeParallax: FunctionalComponent = () => (
  <Box height={"100vh"} w={"full"}>
    <TextLayer />
    <BackCloudLayer />
    <DudeOnMountainLayer />
    <FrontCloudLayer />
  </Box>
);
