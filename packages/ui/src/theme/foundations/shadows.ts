import { ThemeOverride } from "@chakra-ui/react";

type PatchedOverride = Exclude<ThemeOverride["shadows"], undefined>;

const baseWithOpacity = (opacity: number) => {
  const baseColor = "#0067ff";
  const opacityHex = (256 * opacity).toString(16);
  return `${baseColor}${opacityHex}`;
};

const imageShadowColor = baseWithOpacity(0.25);
const outlineShadowColor = baseWithOpacity(0.6);

const shadows: PatchedOverride = {
  imageLeft: `-15px 15px 60px ${imageShadowColor}`,
  imageRight: `15px 15px 60px ${imageShadowColor}`,
  outline: `0 0 0 3px ${outlineShadowColor}`,
};

export default shadows;
