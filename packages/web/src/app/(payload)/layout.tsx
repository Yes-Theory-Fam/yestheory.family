/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import "@payloadcms/next/css";
import configPromise from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type React from "react";
import "./styles/tailwind.css";
import { importMap } from "./admin/importMap";

export const dynamic = "force-dynamic";

type Args = {
	children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async (args) => {
	"use server";
	return handleServerFunctions({ ...args, config: configPromise, importMap });
};

const Layout = ({ children }: Args) => (
	<RootLayout
		config={configPromise}
		importMap={importMap}
		serverFunction={serverFunction}
	>
		{children}
	</RootLayout>
);

export default Layout;
