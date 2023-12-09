import {type LinkProps} from '../link/link';

export interface User {
  username: string;
  avatarUrl?: string | null | undefined;
}

export interface MenuItemDefinition {
  key?: string;
  label: string;
  onClick?: () => void;
}

export type NavLinkDefinition = LinkProps & {
  text: string;
  inverted?: boolean;
};

export type NavigationProps = {
  links: NavLinkDefinition[];
  onLoginButtonClick: () => void;
  user?: User | undefined;
  menuItems: MenuItemDefinition[];
};
