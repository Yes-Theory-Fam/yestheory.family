import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { FC, PropsWithChildren } from "react";
import { VariantProp, variants } from "../../variants";

const colorVariants = variants(
  {
    inline: "text-brand-800",
    black: "text-gray-800",
  },
  "inline"
);

export type LinkProps = NextLinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
  VariantProp<typeof colorVariants> & {
    active?: boolean;
    inverted?: boolean;
    hideUnderline?: boolean;
  } & React.RefAttributes<HTMLAnchorElement>;

export const Link: FC<PropsWithChildren<LinkProps>> = ({
  className,
  variant,
  active = false,
  inverted = false,
  hideUnderline,
  ...rest
}) => {
  return (
    <NextLink
      className={colorVariants(
        variant,
        "border-b-2 border-transparent no-underline",
        active && (inverted ? "border-white" : "border-brand-800"),
        inverted && "text-white",
        !hideUnderline &&
          (inverted ? "hover:border-white" : "hover:border-brand-800"),
        className
      )}
      {...rest}
    />
  );
};
