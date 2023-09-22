"use client";

import NiceModal from "@ebay/nice-modal-react";
import { useRouter } from "next/navigation";
import { FC, useCallback } from "react";
import { Button } from "ui";
import { type BuddyProjectStatus } from "../../../__generated__/graphql";
import { navigateToLogin } from "../../../context/user/user";
import { ServerJoinConfirmationModal } from "./server-join-confirmation";
import { SignupSuccessModal } from "./signup-success-modal";
import { useBuddyProjectSignUpMutation } from "../buddyproject.client.generated";

export type BuddyProjectButtonProps = {
  isLoggedIn: boolean;
  isOnServer: boolean;
  state: BuddyProjectStatus;
};

export const BuddyProjectButton: FC<BuddyProjectButtonProps> = ({
  isLoggedIn,
  isOnServer,
  state,
}) => {
  const router = useRouter();
  const [, buddyProjectSignUp] = useBuddyProjectSignUpMutation();

  const signUp = useCallback(async () => {
    if (!isOnServer) {
      const confirmedJoinServer = await NiceModal.show(
        ServerJoinConfirmationModal
      );

      if (!confirmedJoinServer) return;
    }

    const signUpResultData = await buddyProjectSignUp({});
    const signUpResult = signUpResultData.data?.buddyProjectSignUp.result;
    if (
      signUpResult === "FULL_SUCCESS" ||
      signUpResult === "SUCCESS_DMS_CLOSED"
    ) {
      void NiceModal.show(SignupSuccessModal, {
        hasDmsClosed: signUpResult === "SUCCESS_DMS_CLOSED",
      });
    }

    router.refresh();
  }, [buddyProjectSignUp, isOnServer, useRouter]);

  if (!isLoggedIn) {
    return <Button onClick={navigateToLogin}>Log in with Discord</Button>;
  }

  if (state === "MATCHED" || state === "SIGNED_UP") {
    return <Button disabled>You signed up!</Button>;
  }

  return <Button onClick={signUp}>Join the Buddy Project!</Button>;
};
