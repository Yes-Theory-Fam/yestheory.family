import {type FC} from 'react';
import {Image, Button, Heading, Link} from 'ui';
import {underConstructionWebp} from '../../../../assets';
import {BackLink} from '../back-link';

export const Wip: FC = () => {
  return (
    <div className='mt-16 flex items-center justify-center md:mt-24'>
      <div className='flex w-10/12 flex-col gap-12'>
        <div className='mx-auto max-w-md p-6'>
          <Image
            src={underConstructionWebp}
            alt='YesBot building a sandcastle :)'
            priority
          />
        </div>
        <Heading frontText='Work in progress' />
        <div className='flex max-w-6xl flex-col items-start gap-8 text-left md:items-center md:text-center'>
          <p>Hey! We are happy to have you around :)</p>
          <p>
            Please note that this page is under heavy construction so new
            features will pop up soon when everything is set up!
          </p>
          <p>
            We are looking forward to having you back when our photowall,
            meetups and groupchats launch.
          </p>
          <p>
            That being said: We couldn&apos;t find the page you were looking
            for. This might be because you mistyped a link, something is broken
            or because the page isn&apos;t completed yet. While you are waiting,
            check out our Discord server below or go <BackLink />!
          </p>
        </div>
        <Link
          hideUnderline
          href='https://discord.gg/yestheory'
          className='flex justify-center'
        >
          <Button variant='solid'>Join Now</Button>
        </Link>
      </div>
    </div>
  );
};
