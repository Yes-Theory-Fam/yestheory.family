import { FunctionalComponent } from "preact";
import { useBuddyProjectState } from "./context/context";
import { Button } from "@chakra-ui/react";
import { BuddyProjectStatus } from "../../__generated__/types";
import { useSignUpMutation } from "./context/buddyproject.generated";
import { navigateToLogin } from "../../context/user/user";

export const BuddyProjectButton: FunctionalComponent = () => {
  const state = useBuddyProjectState();
  const [{ fetching }, signUp] = useSignUpMutation();

  console.log(state);

  if (!state.status)
    return <Button onClick={navigateToLogin}>Log In With Discord</Button>;
  if (
    state.status === BuddyProjectStatus.Matched ||
    state.status === BuddyProjectStatus.SignedUp
  ) {
    return <Button disabled>You already signed up</Button>;
  }

  return (
    <Button onClick={() => signUp()}>
      Join the Buddy Project! {fetching && "Loading (scuffed)"}
    </Button>
  );
};
