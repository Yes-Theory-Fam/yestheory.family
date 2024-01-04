import {
  SiDiscord,
  SiDiscordHex,
  SiFacebook,
  SiFacebookHex,
  SiInstagram,
  SiInstagramHex,
  SiSignal,
  SiSignalHex,
  SiTelegram,
  SiTelegramHex,
  SiWhatsapp,
  SiWhatsappHex,
} from '@icons-pack/react-simple-icons';
import {type FC, type PropsWithChildren} from 'react';
import {twMerge} from 'tailwind-merge';
import type {Groupchat_Platform} from '../../../__generated__/graphql';
import {Button} from '../../common/button/button';
import gridClasses from './group-chat-result.module.css';

const KeywordBadge: FC<PropsWithChildren> = ({children}) => (
  <span className='inline-block rounded-md border border-brand-800 p-1 text-xs capitalize text-brand-800'>
    {children}
  </span>
);

export type GroupChatResultProps = {
  platform: Groupchat_Platform;
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

const platformIcons: Record<Groupchat_Platform, IconDefinition> = {
  discord: {Icon: SiDiscord, color: SiDiscordHex},
  facebook: {Icon: SiFacebook, color: SiFacebookHex},
  instagram: {Icon: SiInstagram, color: SiInstagramHex},
  signal: {Icon: SiSignal, color: SiSignalHex},
  telegram: {Icon: SiTelegram, color: SiTelegramHex},
  whatsapp: {Icon: SiWhatsapp, color: SiWhatsappHex},
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

      <p className={twMerge(gridClasses.title, 'font-bold capitalize')}>
        {name.toLowerCase()}
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
