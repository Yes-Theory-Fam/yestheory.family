import {type FC} from 'react';
import type {Groupchat_Platform} from '../../../__generated__/graphql';
import {PlatformFilter} from './platform-filter';
import {SearchInput} from './search-input';

type SearchChangeArgs = {
  query: string;
  platforms: Groupchat_Platform[];
};

export type GroupChatSearchBarProps = {
  search: SearchChangeArgs;
  onSearchChange: (search: SearchChangeArgs) => void;
};

type SearchReducerAction =
  | {type: 'clearQuery'}
  | {type: 'setQuery'; query: string}
  | {type: 'togglePlatform'; platform: Groupchat_Platform};

const searchReducer = (
  state: SearchChangeArgs,
  action: SearchReducerAction,
): SearchChangeArgs => {
  switch (action.type) {
    case 'clearQuery':
      return {...state, query: ''};
    case 'setQuery':
      return {...state, query: action.query};
    case 'togglePlatform':
      return {
        ...state,
        platforms: state.platforms.includes(action.platform)
          ? state.platforms.filter((p) => p !== action.platform)
          : [...state.platforms, action.platform],
      };
  }
};

export const GroupChatSearchBar: FC<GroupChatSearchBarProps> = ({
  search,
  onSearchChange,
}) => (
  <div className='container mx-auto max-w-4xl'>
    <SearchInput
      onChange={(newValue) =>
        onSearchChange(
          searchReducer(search, {type: 'setQuery', query: newValue}),
        )
      }
    />
    <PlatformFilter
      selectedPlatforms={search.platforms}
      onPlatformToggle={(p) => {
        onSearchChange(
          searchReducer(search, {type: 'togglePlatform', platform: p}),
        );
      }}
    />
  </div>
);
