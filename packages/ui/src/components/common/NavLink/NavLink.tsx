import { FC, useContext } from "react";
import { OverrideComponentContext, WrappedLink, WrappedLinkProps } from "../..";

export interface NavLinkProps extends WrappedLinkProps {
  active?: boolean;
  inverted?: boolean;
}

export const NavLink: FC<NavLinkProps> = (args) => {
  const { active: argsActive, inverted, href, ...rest } = args;
  const { useIsActiveLink } = useContext(OverrideComponentContext);

  const isActiveLink = useIsActiveLink(href ?? "");
  const active = argsActive || isActiveLink;

  const borderBaseColor = inverted ? "white" : "brand.800";
  const borderColor = active ? borderBaseColor : "transparent";
  const color = inverted ? "white" : "gray.700";

  const hover = {
    borderColor: borderBaseColor,
  };

  return (
    <WrappedLink
      href={href}
      textTransform={"uppercase"}
      _hover={hover}
      borderBottom={"2px"}
      borderColor={borderColor}
      color={color}
      fontSize={"md"}
      {...rest}
    />
  );
};
