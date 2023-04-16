"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Button, Modal } from "ui";

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

  return (
    <Modal title={"Just to be sure!"} onCancel={cancel}>
      <p>
        To join the Buddy project, you have to join the Yes Fam Discord server.
        Continue?
      </p>

      <div className="w-full mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-end">
        <Button variant={"outlined"} onClick={cancel}>
          No
        </Button>
        <Button variant={"outlined"} onClick={confirm}>
          Yes
        </Button>
      </div>
    </Modal>
  );
});
