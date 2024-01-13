import {type Metadata} from 'next';
import {Heading} from 'ui';
import {getTypesenseClient, TypesenseProvider} from '../../context/typesense';
import {getIsLoggedIn} from '../../context/user/user';
import {ensureNavEnabled} from '../../lib/features/features';
import {graphqlWithHeaders} from '../../lib/graphql/client';
import {fetchResults} from './components/fetch-groupchats';
import {GroupChatSearch} from './components/group-chat-search';
import {type GroupchatResult} from './components/use-groupchat-search';

export const metadata: Metadata = {
  title: 'Groupchats',
  description:
    'Search the many groupchats of the Yes Fam to engage with the community',
};

const getInitialGroupchats = async (
  apiKey: string,
): Promise<GroupchatResult[]> => {
  const client = getTypesenseClient(apiKey);

  const [results] = await fetchResults('', [], client);

  return results;
};

const GroupChats = async () => {
  await ensureNavEnabled('groupchats');

  const isLoggedIn = await getIsLoggedIn();
  const apiKey = (await graphqlWithHeaders((sdk) => sdk.TypesenseApiKey()))
    .groupchatSearchToken;

  const initialGroupchats = await getInitialGroupchats(apiKey);

  return (
    <div className='mt-28'>
      <Heading frontText='Group' blueText='chats' />

      <TypesenseProvider apiKey={apiKey}>
        <GroupChatSearch
          initialGroupchats={initialGroupchats}
          isLoggedIn={isLoggedIn}
        />
      </TypesenseProvider>
    </div>
  );
};

export default GroupChats;
