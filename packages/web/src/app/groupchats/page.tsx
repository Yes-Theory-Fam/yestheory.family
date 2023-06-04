import { Heading } from "ui";
import { CommonGroupChats } from "./components/common-group-chats";
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

      <div className="flex flex-col-reverse md:flex-row">
        <div className={"flex-[3] grow"}>
          <GroupChatSearch />
        </div>
        <div className="w-px bg-gray-300 mx-4 shrink-0" />

        <div className={"flex-1"}>
          <CommonGroupChats />
        </div>
      </div>
    </div>
  );
};

export default GroupChats;
