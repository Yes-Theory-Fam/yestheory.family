import {type FC} from 'react';
import {twMerge} from 'tailwind-merge';
import {Button} from '../../button/button';
import {DiscordLogo} from '../../icons/discord-logo';

export type LoginButtonProps = {
  inverted?: boolean;
  onClick: () => void;
};

export const LoginButton: FC<LoginButtonProps> = ({
  inverted = false,
  onClick,
}) => {
  return (
    <Button
      variant={inverted ? 'outlined' : 'solid'}
      size='small'
      className='group flex items-center justify-center gap-1'
      onClick={onClick}
    >
      <DiscordLogo
        className={twMerge(
          'transition-fill h-5 w-5 duration-300',
          inverted ? 'fill-brand-800 group-hover:fill-white' : 'fill-white',
        )}
      />
      Sign in with Discord
    </Button>
  );
};
