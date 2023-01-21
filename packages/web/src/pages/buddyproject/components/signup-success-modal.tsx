import { FC } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Button,
} from "@chakra-ui/react";

interface SignupSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;

  hasDmsClosed: boolean;
}

export const SignupSuccessModal: FC<SignupSuccessModalProps> = ({
  isOpen,
  onClose,
  hasDmsClosed,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Everything went well!</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            You are now signed up to the Buddy Project! YesBot will message you
            soon with your buddy and the questions. Until then, feel free to
            explore our server!
          </Text>

          <br />

          {hasDmsClosed && (
            <Text fontSize={"sm"}>
              <Text as={"b"}>Note:</Text> YesBot was not able to send you a
              confirmation message because of your Privacy Settings. Make sure
              to allow DMs from server members to be able to receive information
              about your buddy.
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button minWidth={24} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
