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
}

export const SignupSuccessModal: FC<SignupSuccessModalProps> = ({
  isOpen,
  onClose,
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
