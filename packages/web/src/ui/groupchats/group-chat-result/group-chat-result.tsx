import { FC, PropsWithChildren, ReactNode } from "react";
import { Button } from "../../common/button/button";
import gridClasses from "./group-chat-result.module.css";
import { twMerge } from "tailwind-merge";

const KeywordBadge: FC<PropsWithChildren> = ({ children }) => (
  <span
    className={
      "p-1 text-brand-800 border border-brand-800 inline-block text-xs rounded-md capitalize"
    }
  >
    {children}
  </span>
);
// TODO get this from the generated graphql stuff
export type GroupChatPlatform =
  | "facebook"
  | "whatsapp"
  | "signal"
  | "telegram"
  | "discord";

export type GroupChatResultProps = {
  platform: GroupChatPlatform;
  name: string;
  description?: string;
  keywords: string[];
  url: string;
};

// TODO see if we can make icon a JSX Constructor so we can pass the className in from here
const platformIcons: Record<GroupChatPlatform, ReactNode> = {
  facebook: "FB",
  whatsapp: "WA",
  signal: "SG",
  telegram: "TE",
  discord: "DC",
};

export const GroupChatResult: FC<GroupChatResultProps> = ({
  platform,
  name,
  description,
  keywords,
  url,
}) => {
  const icon = platformIcons[platform];
  const maxKeywords = 3;
  const firstKeywords = keywords.slice(0, maxKeywords);
  const remainingKeywordCount = keywords.length - maxKeywords;

  return (
    <div className={twMerge("gap-2 md:gap-3 p-4", gridClasses["result-grid"])}>
      <div
        className={twMerge(gridClasses.icon, "self-center justify-self-center")}
      >
        {icon}
      </div>
      <div className={twMerge(gridClasses.meta, "space-x-2")}>
        {firstKeywords.map((r) => (
          <KeywordBadge key={r}>{r}</KeywordBadge>
        ))}
        {remainingKeywordCount > 0 && (
          // TODO clickable to see them in an popover?
          <KeywordBadge>+{remainingKeywordCount}</KeywordBadge>
        )}
      </div>
      <p className={twMerge(gridClasses.title, "font-bold")}>{name}</p>
      <p className={gridClasses.description}>{description}</p>

      <a
        href={url}
        className={twMerge(gridClasses.join, "sm:justify-self-end")}
      >
        <Button size={"tiny"} variant={"solid"}>
          Join
        </Button>
      </a>
    </div>
  );
};
