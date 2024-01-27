import type {FC} from 'react';
import {Heading} from '../../../ui';

export const Intro: FC = () => {
  return (
    <div>
      <Heading
        frontText='Welcome to'
        blueText=' YesTheory '
        backText='family'
        size='h2'
        className='text-center'
      />
      <p>
        This place aims to provide a platform for the community as a whole. To
        give new people an easy entry into what the Yes Fam has to offer and for
        existing members to find new ways to connect!
      </p>
    </div>
  );
};
