import { FunctionalComponent } from "preact";
import { useBuddyProjectState } from "./context/context";
import { Button, useDisclosure } from "@chakra-ui/react";
import { BuddyProjectStatus } from "../../__generated__/types";
import { useSignUpMutation } from "./context/buddyproject.generated";
import { navigateToLogin } from "../../context/user/user";
import { useServerStateQuery } from "./server-state-query.generated";
import { useCallback } from "preact/compat";
import { ServerJoinConfirmation } from "./server-join-confirmation";
import { SignupSuccessModal } from "./signup-success-modal";
import { useEffect } from "react";

export const BuddyProjectButton: FunctionalComponent = () => {
  const state = useBuddyProjectState();
  const [{ fetching, data: signUpData }, signUpMutation] = useSignUpMutation();

  const [{ data: onServerData }] = useServerStateQuery();
  const {
    isOpen: joinIsOpen,
    onClose: joinOnClose,
    onOpen: joinOnOpen,
  } = useDisclosure();
  const {
    isOpen: successIsOpen,
    onClose: successOnClose,
    onOpen: successOnOpen,
  } = useDisclosure();

  const signUp = useCallback(
    async (confirmed = false) => {
      if (!onServerData?.me?.isOnServer && !confirmed) {
        joinOnOpen();
        return;
      }

      await signUpMutation();
    },
    [signUpMutation, onServerData, joinOnOpen]
  );

  useEffect(() => {
    if (signUpData?.signUp.status === BuddyProjectStatus.SignedUp) {
      successOnOpen();
    }
  }, [successOnOpen, signUpData]);

  if (!state.status) {
    return <Button onClick={navigateToLogin}>Log In With Discord</Button>;
  }

  if (
    state.status === BuddyProjectStatus.Matched ||
    state.status === BuddyProjectStatus.SignedUp
  ) {
    return (
      <>
        <SignupSuccessModal isOpen={successIsOpen} onClose={successOnClose} />
        <Button disabled>You signed up!</Button>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => signUp()} isLoading={fetching}>
        Join the Buddy Project!
      </Button>
      <ServerJoinConfirmation
        isOpen={joinIsOpen}
        onClose={joinOnClose}
        onConfirm={() => signUp(true)}
      />
    </>
  );
};
