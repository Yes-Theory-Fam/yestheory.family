import {type Metadata} from 'next';
import {Heading} from 'ui';
import {TypesenseProvider} from '../../context/typesense';
import {getIsLoggedIn} from '../../context/user/user';
import {graphqlWithHeaders} from '../../lib/graphql/client';
import {GroupChatSearch} from './components/group-chat-search';

export const metadata: Metadata = {
  title: 'Groupchats',
};

const GroupChats = async () => {
  const isLoggedIn = await getIsLoggedIn();
  const apiKey = await graphqlWithHeaders((sdk) => sdk.TypesenseApiKey());

  return (
    <div className='mt-28'>
      <Heading frontText='Group' blueText='chats' />

      <TypesenseProvider apiKey={apiKey.groupchatSearchToken}>
        <GroupChatSearch isLoggedIn={isLoggedIn} />
      </TypesenseProvider>
    </div>
  );
};

export default GroupChats;
