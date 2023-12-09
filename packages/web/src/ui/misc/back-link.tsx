'use client';

import {type FC} from 'react';
import {Link} from 'ui';

export const BackLink: FC = () => {
  return (
    <Link href='#' onClick={() => history.back()}>
      back
    </Link>
  );
};
