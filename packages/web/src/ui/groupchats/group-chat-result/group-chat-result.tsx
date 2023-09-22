import { FC, PropsWithChildren } from "react";
import { Button } from "../../common/button/button";
import gridClasses from "./group-chat-result.module.css";
import { twMerge } from "tailwind-merge";
import {
  SiDiscord,
  SiFacebook,
  SiSignal,
  SiTelegram,
  SiWhatsapp,
} from "@icons-pack/react-simple-icons";
import { IconType } from "@icons-pack/react-simple-icons/types";

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
  promoted: number;
};

type IconDefinition = {
  Icon: IconType;
  color: string;
};

const platformIcons: Record<GroupChatPlatform, IconDefinition> = {
  facebook: { Icon: SiFacebook, color: "#1877F2" },
  whatsapp: { Icon: SiWhatsapp, color: "#25D366" },
  signal: { Icon: SiSignal, color: "#3A76F0" },
  telegram: { Icon: SiTelegram, color: "#26A5E4" },
  discord: { Icon: SiDiscord, color: "#5865F2" },
};

export const GroupChatResult: FC<GroupChatResultProps> = ({
  platform,
  name,
  description,
  keywords,
  url,
  promoted,
}) => {
  const { Icon, color } = platformIcons[platform];
  const maxKeywords = 3;
  const firstKeywords = keywords.slice(0, maxKeywords);
  const remainingKeywordCount = keywords.length - maxKeywords;

  return (
    <div
      className={twMerge(
        "gap-2 md:gap-3 p-4 hover:bg-gray-50/50",
        gridClasses["result-grid"]
      )}
    >
      <div
        className={twMerge(gridClasses.icon, "self-center justify-self-center")}
      >
        <Icon color={color} className={"sm:h-10 sm:w-10"} />
      </div>

      <p className={twMerge(gridClasses.title, "font-bold")}>
        {name}
        {promoted ? (
          <span className={"text-xs text-gray-500 font-normal ml-1"}>
            (Promoted)
          </span>
        ) : undefined}
      </p>

      <div className={twMerge(gridClasses.meta, "space-x-2")}>
        {firstKeywords.map((r) => (
          <KeywordBadge key={r}>{r}</KeywordBadge>
        ))}
        {remainingKeywordCount > 0 && (
          // TODO clickable to see them in an popover?
          <KeywordBadge>+{remainingKeywordCount}</KeywordBadge>
        )}
      </div>
      <p className={gridClasses.description}>{description}</p>

      <a
        href={url}
        className={twMerge(
          gridClasses.join,
          "sm:justify-self-end sm:self-center"
        )}
        target={"_blank"}
        rel="noreferrer"
      >
        <Button size={"tiny"} variant={"solid"}>
          Join
        </Button>
      </a>
    </div>
  );
};
