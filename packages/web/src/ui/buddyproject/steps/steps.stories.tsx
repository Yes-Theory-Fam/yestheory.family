import {type Meta, type StoryObj} from '@storybook/react';
import {Step} from '../common';
import {
  ChattingWithYourBuddyStep,
  JoinStep,
  MatchedStep,
  SignedUpConfirmationStep,
  WaitForMatchStep,
} from '.';

export default {
  title: 'Buddy Project/Steps',
  component: Step,
} satisfies Meta;

export const Steps: StoryObj = {
  render: () => {
    return (
      <div className='grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <JoinStep />
        <WaitForMatchStep />
        <SignedUpConfirmationStep />
        <MatchedStep buddyName='ExampleBuddy#1234' />
        <ChattingWithYourBuddyStep />
      </div>
    );
  },
};
