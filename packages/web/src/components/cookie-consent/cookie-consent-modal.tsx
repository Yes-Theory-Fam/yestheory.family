"use client";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useCallback } from "react";
import { Button, Link, Modal } from "ui";

const cookieAcceptName = "ytf-cookie-consent";

export const CookieConsentModal = NiceModal.create(() => {
  const modal = useModal();

  const acceptCookies = useCallback(() => {
    const host = location.hostname;
    const expiryDate = new Date();
    expiryDate.setUTCFullYear(expiryDate.getUTCFullYear() + 1);

    const isSecure = window.location.protocol === "https:";
    document.cookie = `${cookieAcceptName}=${Date.now()};expires=${expiryDate.toUTCString()};domain=${host}${
      isSecure ? ";secure" : ""
    }`;

    modal.resolve();
    modal.remove();
  }, []);

  return (
    <Modal title="Real quick!">
      <p>
        This website uses cookies to function. We promise to only use cookies
        that are required to make the website functional!
      </p>
      <p>
        If you do not agree that cookies are used, you will sadly not be able to
        use this website.
      </p>
      <p>
        Find more information on the use of cookies in our{" "}
        <Link href={"/privacy"}>Privacy Policy</Link>!
      </p>

      <div className="w-full mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-end">
        <Button
          variant={"outlined"}
          onClick={() => (window.location.href = "https://example.com")}
        >
          Decline
        </Button>
        <Button variant={"outlined"} onClick={acceptCookies}>
          Accept
        </Button>
      </div>
    </Modal>
  );
});
