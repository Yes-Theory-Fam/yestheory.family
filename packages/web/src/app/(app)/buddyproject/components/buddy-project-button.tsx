'use client';

import {show as showNiceModal} from '@ebay/nice-modal-react';
import {useRouter} from 'next/navigation';
import {type FC, useCallback} from 'react';
import {Button} from 'ui';
import {type BuddyProjectStatus} from '../../../../__generated__/graphql';
import {navigateToLogin} from '../../../../context/user/navigate-to-login';
import {buddyProjectSignUp} from '../actions/signup-server-action';
import {ServerJoinConfirmationModal} from './server-join-confirmation';
import {SignupSuccessModal} from './signup-success-modal';

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

  const signUp = useCallback(async () => {
    if (!isOnServer) {
      const confirmedJoinServer = await showNiceModal(
        ServerJoinConfirmationModal,
      );

      if (!confirmedJoinServer) return;
    }

    const signUpResult = await buddyProjectSignUp();

    if (
      signUpResult === 'FULL_SUCCESS' ||
      signUpResult === 'SUCCESS_DMS_CLOSED'
    ) {
      void showNiceModal(SignupSuccessModal, {
        hasDmsClosed: signUpResult === 'SUCCESS_DMS_CLOSED',
      });
    }

    router.refresh();
  }, [isOnServer, router]);

  if (!isLoggedIn) {
    return (
      <Button onClick={() => navigateToLogin()}>Log in with Discord</Button>
    );
  }

  if (state === 'MATCHED' || state === 'SIGNED_UP') {
    return <Button disabled>You signed up!</Button>;
  }

  return <Button onClick={signUp}>Join the Buddy Project!</Button>;
};
