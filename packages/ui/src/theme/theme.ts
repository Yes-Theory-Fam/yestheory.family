import "@fontsource/roboto/400.css";
import "@fontsource/roboto/900.css";

import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

import {
  breakpoints,
  colors,
  fonts,
  shadows,
  sizes,
  styles,
} from "./foundations";

import { Button, Link, Heading } from "./components";

if (!Button || !Link || !Heading) throw new Error("Yoink");

export default extendTheme(
  {
    breakpoints,
    colors,
    fonts,
    shadows,
    sizes,
    styles,
    components: {
      Button,
      Heading,
      Link,
    },
  },
  withDefaultColorScheme({ colorScheme: "brand" })
);
