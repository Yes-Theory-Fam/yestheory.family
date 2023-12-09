'use client';

import {useModal, create as createNiceModal} from '@ebay/nice-modal-react';
import {Modal, type ModalActionButton} from 'ui/client';

export const SignupSuccessModal = createNiceModal<{hasDmsClosed: boolean}>(
  ({hasDmsClosed}) => {
    const modal = useModal();

    const close = () => modal.remove();

    const actions: ModalActionButton[] = [
      {
        text: 'Close',
        className: 'block ml-auto',
        onClick: close,
      },
    ];

    return (
      <Modal title='Everything went well!' onCancel={close} actions={actions}>
        <p>
          You are now signed up to the Buddy Project! YesBot will message you
          soon with your buddy and the questions. Until then, feel free to
          explore our server!
        </p>

        <br />

        {hasDmsClosed && (
          <p className='text-sm'>
            <b>Note:</b> YesBot was not able to send you a confirmation message
            because of your Privacy Settings. Make sure to allow DMs from server
            members to be able to receive information about your buddy.
          </p>
        )}
      </Modal>
    );
  },
);
