import { h, FunctionalComponent } from "preact";
import { useContext } from "preact/hooks";
import { OverrideComponentContext } from "..";
import { Link } from "@chakra-ui/react";
import { WrappedLink } from "../util/WrappedLink";

export interface NavLinkProps {
  href: string;
}

// Example of how to use the provided wrapLink function to wrap links with for example NextLink
// Red is only used to make the NavLink clearer on the Next page.
export const NavLink: FunctionalComponent<NavLinkProps> = ({
  href,
  children,
}) => {
  return (
    <WrappedLink href={href} color={"red"}>
      {children}
    </WrappedLink>
  );
};
