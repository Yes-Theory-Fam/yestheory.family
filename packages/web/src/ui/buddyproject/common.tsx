import {type FC, type ReactNode} from 'react';
import {Link} from 'ui';

export const SectionHeading: FC<{text: string}> = ({text}) => (
  <p className='text-2xl font-bold text-gray-800'>{text}</p>
);

export const Step: FC<{heading: string; children: ReactNode}> = ({
  heading,
  children,
}) => (
  <div className='flex flex-col items-start'>
    <SectionHeading text={heading} />
    {children}
  </div>
);

export const DiscordLink: FC = () => (
  <Link href='https://discord.gg/yestheory'>Yes Theory Fam Discord server</Link>
);
