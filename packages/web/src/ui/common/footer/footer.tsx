import { FC } from "react";
import { Logo } from "../logo/logo";
import { AffiliationExclusion } from "./components/affiliation-exclusion";
import { Copyright } from "./components/copyright";
import {
  FooterLinkDefinition,
  FooterLinkRow,
} from "./components/footer-link-row";

export type FooterProps = { links: FooterLinkDefinition[] };

export const Footer: FC<FooterProps> = ({ links }) => {
  return (
    <footer className="flex flex-col bg-white py-4 items-center gap-2">
      <Logo />
      <FooterLinkRow links={links} />
      <AffiliationExclusion />
      <Copyright />
    </footer>
  );
};
