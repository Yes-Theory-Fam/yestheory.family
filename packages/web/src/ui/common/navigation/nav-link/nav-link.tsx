'use client';

import {useSelectedLayoutSegments} from 'next/navigation';
import {type FC} from 'react';
import {Link} from '../../link/link';
import {type NavLinkDefinition} from '../navigation.types';

export const NavLink: FC<NavLinkDefinition> = ({href, text, ...rest}) => {
  const selectedSegment = useSelectedLayoutSegments();
  const hrefString = href.toString();
  const withoutLeadingSlash = hrefString.startsWith('/')
    ? hrefString.substring(1)
    : hrefString;
  const hrefSegmentLength = withoutLeadingSlash.split('/').length;
  const segmentMatch = selectedSegment.slice(0, hrefSegmentLength).join('/');

  const active =
    segmentMatch.length > 0 && withoutLeadingSlash.startsWith(segmentMatch);

  return (
    <Link
      {...rest}
      href={href}
      className='uppercase'
      variant='black'
      active={active}
    >
      {text}
    </Link>
  );
};
