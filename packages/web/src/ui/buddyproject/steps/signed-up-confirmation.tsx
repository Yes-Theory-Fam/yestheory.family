import {type FC} from 'react';
import {DiscordLink, Step} from '../common';

export const SignedUpConfirmationStep: FC = () => (
  <Step heading='You have signed up!'>
    <p>You are signed up for the Buddy Project.</p>
    <p>
      While you are waiting for your match, feel free to look around the{' '}
      <DiscordLink /> and get to know some of the people there!
    </p>
    <strong>
      Be sure to stick around on the server. If you leave while not matched, you
      will not get a buddy.
    </strong>
  </Step>
);
