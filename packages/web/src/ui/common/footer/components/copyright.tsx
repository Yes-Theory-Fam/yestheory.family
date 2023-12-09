import {type FC} from 'react';

export const Copyright: FC = () => (
  <span className='text-sm uppercase text-gray-600'>
    &copy; YesTheoryFam {new Date().getFullYear()}
  </span>
);
