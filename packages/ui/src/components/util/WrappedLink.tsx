import { h, FunctionalComponent } from "preact";
import { Link, LinkProps } from "@chakra-ui/react";
import { useContext } from "react";
import { OverrideComponentContext } from "./OverrideComponentContext";

export interface WrappedLinkProps extends LinkProps {
  isExternal?: boolean;
}

export const WrappedLink: FunctionalComponent<WrappedLinkProps> = ({
  href,
  isExternal = false,
  ...rest
}) => {
  const { wrapLink } = useContext(OverrideComponentContext);
  rest = { target: "_blank", rel: "noopener noreferrer", ...rest };

  if (isExternal) return <Link href={href} {...rest} />;
  return wrapLink(<Link {...rest} />, href);
};
