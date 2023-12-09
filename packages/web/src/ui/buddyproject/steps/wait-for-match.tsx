import {type FC} from 'react';
import {Step} from '../common';

export const WaitForMatchStep: FC = () => (
  <Step heading='What happens next?'>
    <p>
      As soon as the sign-up deadline is reached, everyone will be matched with
      a buddy.
    </p>
    <p>This might take a while so be patient!</p>
    <p>
      <b>YesBot</b>, our very own bot, will message you on discord with the name
      of your partner, a set of questions and further instructions. You will
      then have to message your buddy.
    </p>
  </Step>
);
