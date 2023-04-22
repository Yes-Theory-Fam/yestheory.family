"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button } from "ui";
import { Modal, ModalActionButton } from "ui/client";

export const ServerJoinConfirmationModal = NiceModal.create(() => {
  const modal = useModal();

  const confirm = () => {
    modal.resolve(true);
    modal.remove();
  };

  const cancel = () => {
    modal.resolve(false);
    modal.remove();
  };

  const actions = [
    {
      text: "No",
      onClick: cancel,
    },
    { text: "Yes", onClick: confirm },
  ] satisfies ModalActionButton[];

  return (
    <Modal title={"Just to be sure!"} onCancel={cancel} actions={actions}>
      <p>
        To join the Buddy project, you have to join the Yes Fam Discord server.
        Continue?
      </p>
    </Modal>
  );
});
