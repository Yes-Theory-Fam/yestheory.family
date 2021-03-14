import { ThemeOverride } from "@chakra-ui/react";

const colors: Exclude<ThemeOverride["colors"], undefined> = {
  brand: {
    50: "#e2f4ff",
    100: "#bae2ff",
    200: "#88d1ff",
    300: "#47beff",
    400: "#00aeff",
    500: "#009eff",
    600: "#008eff",
    700: "#007aff",
    800: "#0167ff",
    900: "#2341e0",
  },
  gray: {
    50: "#f7f7f7",
    100: "#eeeeee",
    200: "#dcdcdc",
    300: "#b8b8b8",
    400: "#999999",
    500: "#707070",
    600: "#474747",
    700: "#3d3d3d",
    800: "#2a2a2a",
    900: "#0f0f0f",
  },
};

export default colors;
