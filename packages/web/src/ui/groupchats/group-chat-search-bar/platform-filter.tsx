import {type FC} from 'react';
import {type Groupchat_Platform} from '../../../__generated__/graphql';
import {ToggleButton} from '../../common/toggle-button/toggle-button';

const platformLabels: Record<Groupchat_Platform, string> = {
  discord: 'Discord',
  facebook: 'Facebook',
  instagram: 'Instagram',
  signal: 'Signal',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
};

export type PlatformFilterProps = {
  selectedPlatforms: Groupchat_Platform[];
  onPlatformToggle: (platform: Groupchat_Platform) => void;
};

const arrayOfAll =
  <T,>() =>
  <U extends T[]>(
    array: U & ([T] extends [U[number]] ? unknown : 'Invalid') & {0: T},
  ) =>
    array;

const allPlatforms = arrayOfAll<Groupchat_Platform>()([
  'discord',
  'facebook',
  'instagram',
  'signal',
  'telegram',
  'whatsapp',
]);

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
