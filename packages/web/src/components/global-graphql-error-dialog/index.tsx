import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";

export const globalGraphqlErrorEventName = "global-graphql-error";

export const GlobalGraphqlErrorDialog: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    window.addEventListener(globalGraphqlErrorEventName, onOpen);

    return () =>
      window.removeEventListener(globalGraphqlErrorEventName, onOpen);
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Something went wrong!</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text>
            Oops! Something went wrong, sorry about that! We were notified about
            the issue and will try our best to work it out! Please try again
            later!
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
