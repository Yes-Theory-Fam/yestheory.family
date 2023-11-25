import { FC, useEffect, useReducer } from "react";
import { GroupChatPlatform } from "../index";
import { SearchInput } from "./search-input";
import { PlatformFilter } from "./platform-filter";

type SearchChangeArgs = {
  query: string;
  platforms: GroupChatPlatform[];
};

export type GroupChatSearchBarProps = {
  onSearchChange: (search: SearchChangeArgs) => void;
};

type SearchReducerAction =
  | { type: "clearQuery" }
  | { type: "setQuery"; query: string }
  | { type: "togglePlatform"; platform: GroupChatPlatform };

const searchReducer = (
  state: SearchChangeArgs,
  action: SearchReducerAction,
): SearchChangeArgs => {
  switch (action.type) {
    case "clearQuery":
      return { ...state, query: "" };
    case "setQuery":
      return { ...state, query: action.query };
    case "togglePlatform":
      return {
        ...state,
        platforms: state.platforms.includes(action.platform)
          ? state.platforms.filter((p) => p !== action.platform)
          : [...state.platforms, action.platform],
      };
  }
};

export const GroupChatSearchBar: FC<GroupChatSearchBarProps> = ({
  onSearchChange,
}) => {
  const [currentSearch, dispatch] = useReducer(searchReducer, {
    query: "",
    platforms: [],
  });

  useEffect(() => {
    onSearchChange(currentSearch);
  }, [currentSearch]);

  return (
    <div className={"container mx-auto max-w-4xl"}>
      <SearchInput
        onChange={(newValue) => dispatch({ type: "setQuery", query: newValue })}
      />
      <PlatformFilter
        selectedPlatforms={currentSearch.platforms}
        onPlatformToggle={(p) => {
          dispatch({ type: "togglePlatform", platform: p });
        }}
      />
    </div>
  );
};
