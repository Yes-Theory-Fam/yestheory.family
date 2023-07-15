import { Heading } from "ui";
import { GroupChatSearch } from "./components/group-chat-search";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
};

/*
TODO
 - Fix UI looking like absolute dogshit
*/

const GroupChats = () => {
  return (
    <div className="mt-28">
      <Heading frontText="Group" blueText="chats" />

      <GroupChatSearch />
    </div>
  );
};

export default GroupChats;
