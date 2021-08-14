import { FunctionalComponent } from "preact";
import { useBuddyProjectState } from "./context/context";
import { Button, useDisclosure } from "@chakra-ui/react";
import { BuddyProjectStatus } from "../../__generated__/types";
import { useSignUpMutation } from "./context/buddyproject.generated";
import { navigateToLogin } from "../../context/user/user";
import { useServerStateQuery } from "./server-state-query.generated";
import { useCallback } from "preact/compat";
import { ServerJoinConfirmation } from "./server-join-confirmation";

export const BuddyProjectButton: FunctionalComponent = () => {
  const state = useBuddyProjectState();
  const [{ fetching }, signUpMutation] = useSignUpMutation();

  const [{ data: onServerData }] = useServerStateQuery();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const signUp = useCallback(
    async (confirmed = false) => {
      if (!onServerData.me.isOnServer && !confirmed) {
        onOpen();
        return;
      }

      const accessToken = localStorage.getItem("accessToken");
      await signUpMutation({ accessToken });
    },
    [signUpMutation, onServerData, onOpen]
  );

  if (!state.status) {
    return <Button onClick={navigateToLogin}>Log In With Discord</Button>;
  }

  if (
    state.status === BuddyProjectStatus.Matched ||
    state.status === BuddyProjectStatus.SignedUp
  ) {
    return <Button disabled>You signed up!</Button>;
  }

  return (
    <>
      <Button onClick={() => signUp()} isLoading={fetching}>
        Join the Buddy Project!
      </Button>
      <ServerJoinConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={() => signUp(true)}
      />
    </>
  );
};
