import { FunctionalComponent } from "preact";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "preact/compat";

interface ServerJoinConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ServerJoinConfirmation: FunctionalComponent<ServerJoinConfirmationProps> =
  ({ isOpen, onClose, onConfirm }) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
      <AlertDialog
        motionPreset={"slideInBottom"}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Auf geht's, ab geht's!</AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody>
            <Text>
              To join the Buddy Project, you have to join the Yes Fam Discord
              server. Continue?
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              variant="outlined"
              minWidth={24}
            >
              No
            </Button>
            <Button ml={3} onClick={onConfirm} minWidth={24}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
