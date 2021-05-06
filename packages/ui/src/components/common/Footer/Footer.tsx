import { h, FunctionalComponent } from "preact";
import { VStack } from "@chakra-ui/react";
import { Copyright } from "./components/Copyright";
import {
  FooterLinkRow,
  FooterLinkDefinition,
} from "./components/FooterLinkRow";
import { Logo } from "../Logo/Logo";

export type { FooterLinkDefinition } from "./components/FooterLinkRow";

export interface FooterProps {
  links: FooterLinkDefinition[];
}

export const Footer: FunctionalComponent<FooterProps> = ({ links }) => (
  <VStack bg={"white"} py={4}>
    <Logo size={["sm", null, "md"]} />
    <FooterLinkRow links={links} />
    <Copyright />
  </VStack>
);
