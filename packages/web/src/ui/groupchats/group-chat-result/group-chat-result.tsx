import {
  SiDiscord,
  SiDiscordHex,
  SiFacebook,
  SiFacebookHex,
  SiSignal,
  SiSignalHex,
  SiTelegram,
  SiTelegramHex,
  SiWhatsapp,
  SiWhatsappHex,
} from '@icons-pack/react-simple-icons';
import {type FC, type PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';
import {Button} from '../../common/button/button';
import gridClasses from './group-chat-result.module.css';

const KeywordBadge: FC<PropsWithChildren> = ({children}) => (
  <span className='inline-block rounded-md border border-brand-800 p-1 text-xs capitalize text-brand-800'>
    {children}
  </span>
);

// TODO get this from the generated graphql stuff
export type GroupChatPlatform =
  | 'facebook'
  | 'whatsapp'
  | 'signal'
  | 'telegram'
  | 'discord';

export type GroupChatResultProps = {
  platform: GroupChatPlatform;
  name: string;
  description?: string;
  keywords: string[];
  url: string;
  promoted: number;
};

type IconType = typeof SiDiscord;

type IconDefinition = {
  Icon: IconType;
  color: string;
};

const platformIcons: Record<GroupChatPlatform, IconDefinition> = {
  facebook: {Icon: SiFacebook, color: SiFacebookHex},
  whatsapp: {Icon: SiWhatsapp, color: SiWhatsappHex},
  signal: {Icon: SiSignal, color: SiSignalHex},
  telegram: {Icon: SiTelegram, color: SiTelegramHex},
  discord: {Icon: SiDiscord, color: SiDiscordHex},
};

export const GroupChatResult: FC<GroupChatResultProps> = ({
  platform,
  name,
  description,
  keywords,
  url,
  promoted,
}) => {
  const {Icon, color} = platformIcons[platform];
  const maxKeywords = 3;
  const firstKeywords = keywords.slice(0, maxKeywords);
  const remainingKeywordCount = keywords.length - maxKeywords;

  return (
    <div
      className={twMerge(
        'gap-2 p-4 hover:bg-gray-50/50 md:gap-3',
        gridClasses['result-grid'],
      )}
    >
      <div
        className={twMerge(gridClasses.icon, 'self-center justify-self-center')}
      >
        <Icon color={color} className='sm:h-10 sm:w-10' />
      </div>

      <p className={twMerge(gridClasses.title, 'font-bold')}>
        {name}
        {promoted ? (
          <span className='ml-1 text-xs font-normal text-gray-500'>
            (Promoted)
          </span>
        ) : undefined}
      </p>

      <div className={twMerge(gridClasses.meta, 'space-x-2')}>
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
          'sm:self-center sm:justify-self-end',
        )}
        target='_blank'
        rel='noreferrer'
      >
        <Button size='tiny' variant='solid'>
          Join
        </Button>
      </a>
    </div>
  );
};
