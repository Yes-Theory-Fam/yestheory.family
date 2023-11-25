import { Collapsible } from "../../../ui/common/collapsible/collapsible";
import { GroupChatPlatform, GroupChatResult } from "../../../ui/groupchats";

type CommonChat = {
  name: string;
  url: string;
  platform: GroupChatPlatform;
};

const commonChatList: CommonChat[] = [
  {
    name: "Yes Fam Discord",
    url: "https://discord.gg/yestheory",
    platform: "discord",
  },
];

export const CommonGroupChats = () => {
  return (
    <Collapsible title={"Large groups"} defaultOpen>
      <div className={"flex flex-col gap-4"}>
        {commonChatList.map((c) => (
          <GroupChatResult keywords={[]} key={c.url} {...c} />
        ))}
      </div>
    </Collapsible>
  );
};
