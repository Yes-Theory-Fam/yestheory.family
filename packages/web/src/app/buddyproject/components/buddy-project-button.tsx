"use client";

import NiceModal from "@ebay/nice-modal-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Button } from "ui";
import {
  type BuddyProjectSignUpMutation,
  type BuddyProjectStatus,
} from "../../../__generated__/graphql";
import { navigateToLogin } from "../../../context/user/user";
import { ServerJoinConfirmationModal } from "./server-join-confirmation";
import { SignupSuccessModal } from "./signup-success-modal";

type AppRouter = ReturnType<typeof useRouter>;

export type BuddyProjectButtonProps = {
  isLoggedIn: boolean;
  isOnServer: boolean;
  state: BuddyProjectStatus;
};

const buddyProjectSignUp = async () => {
  const response = await fetch("/api/buddyproject", { method: "POST" });
  return (await response.json()) as BuddyProjectSignUpMutation["buddyProjectSignUp"];
};

const signUp = async (isOnServer: boolean, router: AppRouter) => {
  if (!isOnServer) {
    const confirmedJoinServer = await NiceModal.show(
      ServerJoinConfirmationModal
    );

    if (!confirmedJoinServer) return;
  }

  const signUpResultData = await buddyProjectSignUp();
  const signUpResult = signUpResultData?.result;
  if (
    signUpResult === "FULL_SUCCESS" ||
    signUpResult === "SUCCESS_DMS_CLOSED"
  ) {
    void NiceModal.show(SignupSuccessModal, {
      hasDmsClosed: signUpResult === "SUCCESS_DMS_CLOSED",
    });
  }

  router.refresh();
};

export const BuddyProjectButton: FC<BuddyProjectButtonProps> = ({
  isLoggedIn,
  isOnServer,
  state,
}) => {
  const router = useRouter();

  if (!isLoggedIn) {
    return <Button onClick={navigateToLogin}>Log in with Discord</Button>;
  }

  if (state === "MATCHED" || state === "SIGNED_UP") {
    return <Button disabled>You signed up!</Button>;
  }

  return (
    <Button onClick={() => signUp(isOnServer, router)}>
      Join the Buddy Project!
    </Button>
  );
};
