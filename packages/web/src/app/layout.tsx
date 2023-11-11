import { Footer } from "ui";
import { PropsWithChildren, Suspense } from "react";
import { Metadata } from "next";
import { CookieConsent } from "../components/cookie-consent/cookie-consent";
import { Nav } from "./nav";
import { Providers } from "./providers";

import "../../styles/globals.css";
import { getCurrentUser } from "../context/user/user";

export const metadata: Metadata = {
  title: {
    absolute: "YesTheory Family",
    template: "%s - YesTheory Family",
  },
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
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#154eff" />
        <meta name="msapplication-TileColor" content="#2d89ef" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Suspense>
          <Providers user={user}>
            <CookieConsent />
            <div className="flex flex-col min-h-screen justify-between">
              <Nav user={user} />

              <main className="max-w-7xl mx-auto w-full px-4 md:px-8">
                {children}
              </main>
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
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
