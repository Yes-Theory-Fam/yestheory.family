"use client";

import { FC } from "react";
import Cookie from "cookie";
import { useEffect } from "react";

import NiceModal from "@ebay/nice-modal-react";
import { CookieConsentModal } from "./cookie-consent-modal";

const cookieAcceptName = "ytf-cookie-consent";

export const CookieConsent: FC = () => {
  useEffect(() => {
    const cookies = Cookie.parse(document.cookie);
    const hasAcceptedCookies = !!cookies[cookieAcceptName];

    if (!hasAcceptedCookies) {
      void NiceModal.show(CookieConsentModal);
    }
  }, []);

  return <></>;
};
