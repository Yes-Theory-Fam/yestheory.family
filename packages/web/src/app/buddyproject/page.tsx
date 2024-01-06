import {type Metadata} from 'next';
import {Image} from 'ui';
import {InfoGrid} from 'ui/buddyproject';
import {ScrollToActionContainer} from 'ui/client';
import {buddyProjectSvg, yesbotBuddyProjectWebp} from '../../../assets';
import {ensureNavEnabled} from '../../lib/features/features';
import {graphqlWithHeaders} from '../../lib/graphql/client';
import {BuddyProjectButton} from './components/buddy-project-button';

const title = 'The Buddy Project';
const description =
  'The Buddy Project is a recurring event led by the Yes Theory community to make new friends!';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    type: 'website',
    images: yesbotBuddyProjectWebp.src,
    url: 'https://yestheory.family/buddyproject',
    description,
  },
};

const CTA = () => {
  return (
    <ScrollToActionContainer text='Get involved'>
      <div className='mx-auto w-full gap-2.5 px-6 lg:w-1/2'>
        <Image
          priority
          src={buddyProjectSvg}
          alt='Buddy Project Logo'
          className='mx-auto'
          height={320}
          width={700}
        />
        <p className='mx-auto max-w-full text-center text-2xl md:max-w-[60%]'>
          Great things come to those who are willing to risk rejection and put
          themselves out there.
        </p>
      </div>
    </ScrollToActionContainer>
  );
};

const Page = async () => {
  await ensureNavEnabled('buddyproject');

  const x = await graphqlWithHeaders((sdk) => sdk.ServerState());

  const currentUser = x.me;
  const isLoggedIn = !!currentUser;
  const isOnServer = currentUser?.isOnServer ?? false;

  const emptyState = {status: 'NOT_SIGNED_UP', buddy: null} as const;

  const state = isLoggedIn
    ? (await graphqlWithHeaders((sdk) => sdk.BuddyProjectState()))
        .getBuddyProjectStatus ?? emptyState
    : emptyState;
  const {status, buddy} = state;

  return (
    <>
      <CTA />
      <div className='mx-auto my-6 flex min-h-[75vh] flex-col items-center justify-center gap-8'>
        <InfoGrid state={status} buddyName={buddy?.username ?? 'Unmatched'} />
        <BuddyProjectButton
          state={status}
          isLoggedIn={isLoggedIn}
          isOnServer={isOnServer}
        />
      </div>
    </>
  );
};

export default Page;
