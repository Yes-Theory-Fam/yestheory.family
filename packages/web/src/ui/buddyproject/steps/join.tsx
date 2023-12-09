import {type FC} from 'react';
import {Link} from 'ui';
import {Step} from '../common';

export const JoinStep: FC = () => (
  <Step heading='How do I join?'>
    <p className='font-bold text-brand-800'>Click the button down below!</p>
    <p>
      Once you do that, you will be asked to join the{' '}
      <Link href='https://discord.gg/yestheory'>Yes Theory Fam server</Link> on{' '}
      <Link href='https://discord.com'>Discord</Link> (if you&apos;re not
      already in it). From then on, everything will be happening over there.
    </p>
  </Step>
);
