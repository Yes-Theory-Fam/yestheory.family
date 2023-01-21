import { Button, useDisclosure } from "@chakra-ui/react";
import { FC, useCallback, useEffect } from "react";
import { BuddyProjectStatus, SignUpResult } from "../../../__generated__/types";
import { navigateToLogin } from "../../../context/user/user";
import { useSignUpMutation } from "./context/buddyproject.generated";
import { useBuddyProjectState } from "./context/context";
import { ServerJoinConfirmation } from "./server-join-confirmation";
import { useServerStateQuery } from "./server-state-query.generated";
import { SignupSuccessModal } from "./signup-success-modal";

export const BuddyProjectButton: FC = () => {
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

      await signUpMutation({});
    },
    [signUpMutation, onServerData, joinOnOpen]
  );

  useEffect(() => {
    if (
      signUpData?.buddyProjectSignUp.result === SignUpResult.FullSuccess ||
      signUpData?.buddyProjectSignUp.result === SignUpResult.SuccessDmsClosed
    ) {
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
        <SignupSuccessModal
          hasDmsClosed={
            signUpData?.buddyProjectSignUp.result ===
            SignUpResult.SuccessDmsClosed
          }
          isOpen={successIsOpen}
          onClose={successOnClose}
        />
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
