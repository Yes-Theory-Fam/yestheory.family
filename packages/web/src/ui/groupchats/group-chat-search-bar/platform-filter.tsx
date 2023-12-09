import {type FC} from 'react';
import {ToggleButton} from '../../common/toggle-button/toggle-button';
import {type GroupChatPlatform} from '../group-chat-result/group-chat-result';

// TODO fetch these from Payload
const allPlatforms: GroupChatPlatform[] = [
  'discord',
  'facebook',
  'signal',
  'telegram',
  'whatsapp',
];

const platformLabels: Record<GroupChatPlatform, string> = {
  discord: 'Discord',
  facebook: 'Facebook',
  signal: 'Signal',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
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
    <div className='flex max-w-[calc(100vw_-_var(--scrollbar-width))] justify-start gap-3 overflow-x-auto py-4'>
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
