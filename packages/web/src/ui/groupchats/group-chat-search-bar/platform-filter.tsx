import { FC } from "react";
import { GroupChatPlatform } from "../group-chat-result/group-chat-result";
import { ToggleButton } from "../../common/toggle-button/toggle-button";

const allPlatforms: GroupChatPlatform[] = [
  "discord",
  "facebook",
  "signal",
  "telegram",
  "whatsapp",
];

const platformLabels: Record<GroupChatPlatform, string> = {
  discord: "Discord",
  facebook: "Facebook",
  signal: "Signal",
  telegram: "Telegram",
  whatsapp: "WhatsApp",
};

export type PlatformFilterProps = {
  selectedPlatforms: GroupChatPlatform[];
  onPlatformToggle: (platform: GroupChatPlatform) => void;
};

export const PlatformFilter: FC<PlatformFilterProps> = ({
  onPlatformToggle,
  selectedPlatforms,
}) => {
  return (
    <div
      className={
        "flex justify-start gap-3 p-4 overflow-x-auto max-w-[calc(100vw_-_var(--scrollbar-width))]"
      }
    >
      {allPlatforms.map((p) => (
        <ToggleButton
          key={p}
          label={platformLabels[p]}
          checked={selectedPlatforms.includes(p)}
          onChange={() => onPlatformToggle(p)}
        />
      ))}
    </div>
  );
};
