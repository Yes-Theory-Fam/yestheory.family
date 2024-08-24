/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import '@payloadcms/next/css';
import {RootLayout} from '@payloadcms/next/layouts';
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react';
import configPromise from '@payload-config';
import './styles/tailwind.css';
import {importMap} from './admin/importMap';

export const dynamic = 'force-dynamic';

type Args = {
  children: React.ReactNode;
};

const Layout = ({children}: Args) => (
  <RootLayout config={configPromise} importMap={importMap}>
    {children}
  </RootLayout>
);

export default Layout;
