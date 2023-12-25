'use client';

import * as NiceModal from '@ebay/nice-modal-react';
import Cookie from 'cookie';
import {type FC, useEffect} from 'react';

import {CookieConsentModal} from './cookie-consent-modal';

const cookieAcceptName = 'ytf-cookie-consent';

export const CookieConsent: FC = () => {
  useEffect(() => {
    const path = window.location.pathname;

    if (path === '/legal/imprint' || path === '/legal/privacy') return;

    const cookies = Cookie.parse(document.cookie);
    const hasAcceptedCookies = !!cookies[cookieAcceptName];

    if (!hasAcceptedCookies) {
      void NiceModal.show(CookieConsentModal);
    }
  }, []);

  return <></>;
};
