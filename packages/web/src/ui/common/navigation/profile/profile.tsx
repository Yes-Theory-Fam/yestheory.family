'use client';

import {
  Root,
  Portal,
  Content,
  Item,
  Trigger,
} from '@radix-ui/react-dropdown-menu';
import {type FC} from 'react';
import {twMerge} from 'tailwind-merge';
import {DefaultDiscordAvatar} from '../../icons/default-discord-avatar';
import {type MenuItemDefinition, type User} from '../navigation.types';

export interface ProfileProps {
  user: User;
  variant: 'desktop' | 'mobile';
  menuItems: MenuItemDefinition[];
}

export const Profile: FC<ProfileProps> = ({user, variant, menuItems}) => {
  const textColor = variant === 'desktop' ? 'text-brand-800' : 'text-white';
  const tagColor = variant === 'desktop' ? 'text-gray-800' : 'text-white';

  const {username, avatarUrl} = user;

  return (
    <Root modal={false}>
      <Trigger className='relative flex cursor-pointer flex-col items-start gap-1 outline-none'>
        <span className={twMerge(textColor, 'text-xs')}>Logged in as:</span>
        <div className='flex items-center gap-2'>
          <div className='relative size-12'>
            {avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={avatarUrl} alt={username} className='rounded-full' />
            ) : (
              <div className='flex size-full items-center justify-center rounded-full bg-[#5865F2]'>
                <DefaultDiscordAvatar className='size-7 text-white' />
              </div>
            )}
            <div className='absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-[green]' />
          </div>
          <span className={tagColor}>{username}</span>
        </div>
        {/* This span is used to align the profile picture in the middle when used in the navbar */}
        <span className='invisible text-xs'>Logged in as:</span>
      </Trigger>

      <Portal>
        <Content
          align='start'
          className='absolute top-full z-50 flex w-min min-w-[120px] flex-col rounded-md border border-gray-200 bg-white py-2 shadow'
        >
          {menuItems.map((i) => (
            <Item
              className='cursor-pointer bg-white px-4 py-2 text-left text-gray-800 hover:bg-gray-100 hover:outline-none'
              onClick={() => i.onClick?.()}
              key={i.key}
            >
              {i.label}
            </Item>
          ))}
        </Content>
      </Portal>
    </Root>
  );
};
