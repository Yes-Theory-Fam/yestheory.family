import {type FC} from 'react';
import {Logo} from '../logo/logo';
import {AffiliationExclusion} from './components/affiliation-exclusion';
import {Copyright} from './components/copyright';
import {
  type FooterLinkDefinition,
  FooterLinkRow,
} from './components/footer-link-row';

export type FooterProps = {links: FooterLinkDefinition[]};

export const Footer: FC<FooterProps> = ({links}) => (
    <footer className='flex flex-col items-center gap-2 bg-white py-4'>
      <Logo />
      <FooterLinkRow links={links} />
      <AffiliationExclusion />
      <Copyright />
    </footer>
  );
