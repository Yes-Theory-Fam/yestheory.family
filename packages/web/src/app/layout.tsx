import { headers } from "next/headers";
import { Footer } from "ui";
import { PropsWithChildren } from "react";
import { Metadata } from "next";
import { CookieConsent } from "../components/cookie-consent/cookie-consent";
import { graphqlWithHeaders } from "../lib/graphql";
import { Nav } from "./nav";
import { Providers } from "./providers";

import "../../styles/globals.css";

export const metadata: Metadata = {
  title: "YesTheory Family",
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    apple: {
      sizes: "180x180",
      url: "/apple-touch-icon.png",
    },
  },
};

const RootLayout = async ({ children }: PropsWithChildren) => {
  const [user] = await graphqlWithHeaders(headers(), (sdk) =>
    sdk.CurrentUser()
  );

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#154eff" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Providers initialUser={user.me ?? undefined}>
          <CookieConsent />
          <div className="flex flex-col min-h-screen justify-between">
            <Nav />

            <main className="max-w-7xl mx-auto">{children}</main>
            <div className="pt-6 bg-white">
              <Footer
                links={[
                  { text: "Imprint", href: "/legal/imprint" },
                  { text: "Privacy", href: "/legal/privacy" },
                ]}
              />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
