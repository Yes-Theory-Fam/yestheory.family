import { FC } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { VariantProp, variants } from "../../variants";

const shadowVariants = variants(
  {
    left: "shadow-image-left",
    right: "shadow-image-right",
    none: "",
  },
  "none"
);

export type ImageProps = NextImageProps &
  VariantProp<typeof shadowVariants, "shadow">;

export const Image: FC<ImageProps> = ({ className, shadow, ...rest }) => {
  return (
    <NextImage
      {...rest}
      className={shadowVariants(shadow, "rounded-2xl", className)}
    />
  );
};
