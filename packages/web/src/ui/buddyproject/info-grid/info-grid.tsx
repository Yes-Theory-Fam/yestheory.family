import {type FC} from 'react';
import {Heading, Image} from 'ui';
import {yesbotBuddyProjectWebp} from '../../../../assets';
import {type BuddyProjectStatus} from '../../../__generated__/graphql';
import {SectionHeading} from '../common';
import {
  SignedUpConfirmationStep,
  MatchedStep,
  ChattingWithYourBuddyStep,
  JoinStep,
  WaitForMatchStep,
} from '../steps';

const InfoHeader: FC = () => (
    <div className='flex flex-col'>
      <Heading
        frontText={'Find a stranger\n'}
        blueText='Discover a friend'
        className='normal-case'
        center={false}
        size='h2'
      />
      <SectionHeading text='Hi!' />
      <p>
        An opportunity to get to know a person miles away from you, building a
        new friendship, and discovering a new way of living, what’s not to like?
      </p>
    </div>
  );

const states = {
  MATCHED: ({buddyName}: {buddyName: string}) => (
    <>
      <SignedUpConfirmationStep />
      <MatchedStep buddyName={buddyName} />
      <ChattingWithYourBuddyStep isMatched />
    </>
  ),
  NOT_SIGNED_UP: () => (
    <>
      <JoinStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  ),
  SIGNED_UP: () => (
    <>
      <SignedUpConfirmationStep />
      <WaitForMatchStep />
      <ChattingWithYourBuddyStep />
    </>
  ),
} as const;

export type InfoGridProps = {
  state: BuddyProjectStatus;
  buddyName?: string;
};

export const InfoGrid: FC<InfoGridProps> = ({state, buddyName}) => {
  const StateInfo = states[state];

  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
      <div className='self-center lg:col-span-2'>
        <InfoHeader />
      </div>
      <div className='relative flex size-full min-h-[400px] max-w-[700px] items-center justify-center lg:min-h-[unset]'>
        <Image
          src={yesbotBuddyProjectWebp}
          alt='Illustration of YesBot delivering a letter with a heart on it to a postbox with the Discord logo on it'
          fill
          className='object-contain'
        />
      </div>
      <StateInfo buddyName={buddyName ?? ''} />
    </div>
  );
};
