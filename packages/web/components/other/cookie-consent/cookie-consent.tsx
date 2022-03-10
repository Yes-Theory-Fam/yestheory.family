import { FunctionalComponent } from "preact";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Link,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Cookie from "cookie";
import { useCallback, useEffect, useRef } from "react";

const cookieAcceptName = "ytf-cookie-consent";

export const CookieConsent: FunctionalComponent = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    const cookies = Cookie.parse(document.cookie);
    const hasAcceptedCookies = !!cookies[cookieAcceptName];

    if (!hasAcceptedCookies && !isOpen) onOpen();
  }, [onOpen, isOpen]);

  const acceptCookies = useCallback(() => {
    const host = location.hostname;
    const expiryDate = new Date();
    expiryDate.setUTCFullYear(expiryDate.getUTCFullYear() + 1);

    const isSecure = window.location.protocol === "https:";
    document.cookie = `${cookieAcceptName}=${Date.now()};expires=${expiryDate.toUTCString()};domain=${host}${
      isSecure ? ";secure" : ""
    }`;

    onClose();
  }, [onClose]);

  const declineRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isCentered
      leastDestructiveRef={declineRef}
      onClose={onClose}
      isOpen={isOpen}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={"xl"}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Text>Real quick!</Text>
        </AlertDialogHeader>

        <AlertDialogBody>
          <VStack spacing={3} align={"flex-start"}>
            <Text>
              This website uses cookies to function. We promise to only use
              cookies that are required to make the website functional!
            </Text>
            <Text>
              If you do not agree that cookies are used, you will sadly not be
              able to use this website.
            </Text>
            <Text>
              Find more information on the use of cookies in our{" "}
              <Link href={"/privacy"}>Privacy Policy</Link>!
            </Text>
          </VStack>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            minWidth={24}
            variant={"outlined"}
            as={Link}
            href={"https://example.com"}
            ref={declineRef}
          >
            Decline
          </Button>
          <Button
            ml={3}
            minWidth={24}
            onClick={acceptCookies}
            variant={"outlined"}
          >
            Accept
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
