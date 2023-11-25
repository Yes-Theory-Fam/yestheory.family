import { Heading } from "ui";
import { GroupChatSearch } from "./components/group-chat-search";
import { Metadata } from "next";
import { getIsLoggedIn } from "../../context/user/user";
import { TypesenseProvider } from "../../context/typesense/provider";
import { graphqlWithHeaders } from "../../lib/graphql/client";

export const metadata: Metadata = {
  title: "Groupchats",
};

const GroupChats = async () => {
  const isLoggedIn = await getIsLoggedIn();
  const apiKey = await graphqlWithHeaders((sdk) => sdk.TypesenseApiKey());

  return (
    <div className="mt-28">
      <Heading frontText="Group" blueText="chats" />

      <TypesenseProvider apiKey={apiKey.groupchatSearchToken}>
        <GroupChatSearch isLoggedIn={isLoggedIn} />
      </TypesenseProvider>
    </div>
  );
};

export default GroupChats;
