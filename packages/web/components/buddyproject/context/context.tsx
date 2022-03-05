import { createContext, FunctionalComponent, VNode } from "preact";
import { BuddyProjectStatus } from "../../../__generated__/types";
import { Buddy, useStateQuery } from "./buddyproject.generated";
import { useLoggedIn } from "../../../context/user/user";
import { useContext } from "preact/hooks";

interface BuddyProjectProps {
  status: BuddyProjectStatus | undefined;
  buddy: Buddy | null | undefined;
}

const BuddyProjectContext = createContext<BuddyProjectProps>({
  status: undefined,
  buddy: undefined,
});

interface BuddyProjectProviderProps {
  children: VNode;
}

export const BuddyProjectProvider: FunctionalComponent<BuddyProjectProviderProps> =
  ({ children }) => {
    const loggedIn = useLoggedIn();
    const [{ data, fetching, error }] = useStateQuery();

    const emptyStatus = { status: undefined, buddy: undefined };

    const value =
      !loggedIn || error || fetching
        ? emptyStatus
        : data?.getBuddyProjectStatus ?? emptyStatus;

    return (
      <BuddyProjectContext.Provider value={value}>
        {children}
      </BuddyProjectContext.Provider>
    );
  };

export const useBuddyProjectState = (): BuddyProjectProps => {
  return useContext(BuddyProjectContext);
};
