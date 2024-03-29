import {type FC} from 'react';
import {Link, type LinkProps} from '../../link/link';

export type FooterLinkDefinition = LinkProps & {text: string};

export type FooterLinkRowProps = {links: FooterLinkDefinition[]};

const definitionToLink = (definition: FooterLinkDefinition) => {
  const {text, key, ...args} = definition;

  return (
    <Link variant='black' {...args} key={key ?? args.href.toString()}>
      {text}
    </Link>
  );
};

export const FooterLinkRow: FC<FooterLinkRowProps> = ({links}) => (
  <div className='flex flex-col items-center gap-2 md:flex-row md:gap-8'>
    {links.map(definitionToLink)}
  </div>
);
