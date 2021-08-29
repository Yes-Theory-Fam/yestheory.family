import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  Footer,
  Navigation,
  OverrideComponentContext,
  OverrideComponentType,
  theme,
} from "@yestheory.family/ui";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FunctionalComponent } from "preact";
import { withUrqlClient } from "next-urql";
import { dedupExchange, cacheExchange, ssrExchange, fetchExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";
import {
  navigateToLogin,
  UserConsumer,
  UserProvider,
} from "../context/user/user";
import cookie from "cookie";
import { useLogoutMutation } from "../components/auth/logout.generated";
import App, { AppContext, AppProps } from "next/app";
import { configuredAuthExchange } from "../lib/urql/configured-auth-exchange";
import { CookieConsent } from "../components/other/cookie-consent/cookie-consent";

declare global {
  interface Window {
    __URQL_DATA__?: never;
  }
}

interface YTFAppProps extends AppProps {
  authenticated: boolean;
}

const componentOverrides: OverrideComponentType = {
  Image,
  wrapLink: function LinkWrap(child, href) {
    return (
      <Link href={href} passHref>
        {child}
      </Link>
    );
  },
};

const isServerSide = typeof window === "undefined";

const YTFApp: FunctionalComponent<YTFAppProps> = ({
  Component,
  pageProps,
  authenticated,
}) => {
  const [, logout] = useLogoutMutation();

  return (
    <ChakraProvider theme={theme}>
      <UserProvider serverAuthenticated={authenticated}>
        <OverrideComponentContext.Provider value={componentOverrides}>
          <Head>
            <title>YesTheory Family</title>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,900;1,400;1,900&display=swap"
              rel="stylesheet"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            />
          </Head>
          <CookieConsent />
          <UserConsumer>
            {(context) => (
              <Navigation
                links={[]}
                onLoginButtonClick={navigateToLogin}
                menuItems={[
                  {
                    onClick: () =>
                      logout().then(({ data }) => {
                        if (!data?.logout) return;

                        context.clearUser();
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("refreshToken");
                        localStorage.removeItem("expiresAt");
                      }),
                    label: "Logout",
                  },
                ]}
                user={context.user}
              />
            )}
          </UserConsumer>
          <Component {...pageProps} />
          <Box pt={6} bg={"white"}>
            <Footer
              links={[
                { text: "Imprint", href: "/imprint" },
                { text: "Privacy", href: "/privacy" },
              ]}
            />
          </Box>
        </OverrideComponentContext.Provider>
      </UserProvider>
    </ChakraProvider>
  );
};

const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
});

const UrqlWrappedApp = withUrqlClient(() => ({
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    configuredAuthExchange,
    ssr,
    fetchExchange,
  ],
  url: isServerSide
    ? process.env.SERVER_BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL,
  fetchOptions: {
    credentials: "include",
  },
}))(YTFApp);

export default UrqlWrappedApp;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - next-urql doesn't have proper tying for getInitialProps on _app see https://github.com/FormidableLabs/urql/issues/1794
UrqlWrappedApp.getInitialProps = async (
  context: AppContext
): Promise<Partial<YTFAppProps>> => {
  const appProps = await App.getInitialProps(context);

  const request = context.ctx.req;
  const isServerSide = !!request;

  const authenticated = isServerSide
    ? !!cookie.parse(request.headers.cookie || "")["koa.sess"]
    : !!localStorage.getItem("accessToken");
  return { ...appProps, authenticated };
};
