import { FC } from "react";
import { Link, LinkProps } from "@chakra-ui/react";
import { useContext } from "react";
import { OverrideComponentContext } from "./OverrideComponentContext";

export interface WrappedLinkProps extends LinkProps {
  isExternal?: boolean;
}

export const WrappedLink: FC<WrappedLinkProps> = ({
  href,
  isExternal = false,
  ...rest
}) => {
  const { wrapLink } = useContext(OverrideComponentContext);
  rest = { rel: "noopener noreferrer", ...rest };

  if (isExternal) return <Link href={href} target="_blank" {...rest} />;
  return wrapLink(<Link {...rest} />, href);
};
