import { FC } from "react";
import { VStack } from "@chakra-ui/react";
import { AffiliationExclusion } from "./components/AffiliationExclusion";
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

export const Footer: FC<FooterProps> = ({ links }) => (
  <VStack bg={"white"} py={4}>
    <Logo size={["sm", null, "md"]} />
    <FooterLinkRow links={links} />
    <AffiliationExclusion />
    <Copyright />
  </VStack>
);
