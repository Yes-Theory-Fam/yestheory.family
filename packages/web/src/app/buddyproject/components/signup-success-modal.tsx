"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button, Modal } from "ui";

export const SignupSuccessModal = NiceModal.create<{ hasDmsClosed: boolean }>(
  ({ hasDmsClosed }) => {
    const modal = useModal();

    const close = () => modal.remove();

    return (
      <Modal title="Everything went well!" onCancel={close}>
        <p>
          You are now signed up to the Buddy Project! YesBot will message you
          soon with your buddy and the questions. Until then, feel free to
          explore our server!
        </p>

        <br />

        {hasDmsClosed && (
          <p className="text-sm">
            <b>Note:</b> YesBot was not able to send you a confirmation message
            because of your Privacy Settings. Make sure to allow DMs from server
            members to be able to receive information about your buddy.
          </p>
        )}

        <Button className="block ml-auto" onClick={close}>
          Close
        </Button>
      </Modal>
    );
  }
);
