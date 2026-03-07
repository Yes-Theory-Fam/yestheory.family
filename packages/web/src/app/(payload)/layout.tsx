/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import '@payloadcms/next/css';
import type {ServerFunctionClient} from 'payload';
import {RootLayout, handleServerFunctions} from '@payloadcms/next/layouts';
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import React from 'react';
import configPromise from '@payload-config';
import './styles/tailwind.css';
import {importMap} from './admin/importMap';

export const dynamic = 'force-dynamic';

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';
  return handleServerFunctions({...args, config: configPromise, importMap});
};

const Layout = ({children}: Args) => (
  <RootLayout
    config={configPromise}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
);

export default Layout;
