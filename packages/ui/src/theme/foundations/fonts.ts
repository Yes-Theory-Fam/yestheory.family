import { ThemeOverride } from "@chakra-ui/react";

type PatchedOverride = Exclude<ThemeOverride["fonts"], undefined>;

const fonts: PatchedOverride = {
  body: "Roboto, sans-serif",
};

export default fonts;
