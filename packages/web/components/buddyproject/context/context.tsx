import { createContext, FunctionalComponent, VNode } from "preact";
import { BuddyProjectStatus } from "../../../__generated__/types";
import { Buddy, useStateQuery } from "./buddyproject.generated";
import { useLoggedIn } from "../../../context/user/user";
import { useContext } from "preact/hooks";

interface BuddyProjectProps {
  status: BuddyProjectStatus | undefined;
  buddy: Buddy | undefined;
}

const BuddyProjectContext = createContext<BuddyProjectProps>({
  status: undefined,
  buddy: undefined,
});

interface BuddyProjectProviderProps {
  children: VNode;
}

export const BuddyProjectProvider: FunctionalComponent<BuddyProjectProviderProps> = ({
  children,
}) => {
  const loggedIn = useLoggedIn();
  const [{ data, fetching, error }] = useStateQuery();

  console.log(data, fetching, error);

  const value =
    !loggedIn || error || fetching
      ? { status: undefined, buddy: undefined }
      : data.getBuddyProjectStatus;

  return (
    <BuddyProjectContext.Provider value={value}>
      {children}
    </BuddyProjectContext.Provider>
  );
};

export const useBuddyProjectState = (): BuddyProjectProps => {
  return useContext(BuddyProjectContext);
};
