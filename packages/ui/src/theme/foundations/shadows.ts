import { ThemeOverride } from "@chakra-ui/react";

type PatchedOverride = Exclude<ThemeOverride["shadows"], undefined>;

const shadowColor = "#0067ff40";

const shadows: PatchedOverride = {
  imageLeft: `-15px 15px 60px ${shadowColor}`,
  imageRight: `15px 15px 60px ${shadowColor}`,
};

export default shadows;
