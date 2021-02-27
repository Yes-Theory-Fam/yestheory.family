import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./colors";
import { Button } from "./components";

if (!Button) {
  throw new Error("Yoink");
}

export default extendTheme({
  colors,
  styles,
  components: {
    Button,
  },
});
