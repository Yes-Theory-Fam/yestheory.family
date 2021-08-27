import { FunctionalComponent } from "preact";
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

export const SignupSuccessModal: FunctionalComponent<SignupSuccessModalProps> = ({
  isOpen,
  onClose,
}) => {
  // TODO Styling, bunch of it!
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
