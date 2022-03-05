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
import { withUrqlClient, initUrqlClient } from "next-urql";
import { dedupExchange, cacheExchange, ssrExchange, fetchExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";
import {
  navigateToLogin,
  UserConsumer,
  UserProvider,
} from "../context/user/user";
import { useLogoutMutation } from "../components/auth/logout.generated";
import App, { AppContext, AppProps } from "next/app";
import { configuredAuthExchange } from "../lib/urql/configured-auth-exchange";
import { CookieConsent } from "../components/other/cookie-consent/cookie-consent";
import { User, CurrentUserDocument } from "../context/user/user.generated";

declare global {
  interface Window {
    __URQL_DATA__?: never;
  }
}

interface YTFAppProps extends AppProps {
  user: User;
}

const componentOverrides: OverrideComponentType = {
  Image,
  wrapLink: function LinkWrap(child, href) {
    return (
      <Link href={new URL(href ?? "#")} passHref>
        {child}
      </Link>
    );
  },
};

const isServerSide = typeof window === "undefined";

const YTFApp: FunctionalComponent<YTFAppProps> = ({
  Component,
  pageProps,
  user,
}) => {
  const [, logout] = useLogoutMutation();

  return (
    <ChakraProvider theme={theme}>
      <UserProvider serverUser={user}>
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
    ? process.env.SERVER_BACKEND_GRAPHQL_URL
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
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
  const cookie = isServerSide ? request.headers.cookie ?? "" : document.cookie;

  const client = initUrqlClient(
    {
      url: isServerSide
        ? process.env.SERVER_BACKEND_GRAPHQL_URL
        : process.env.NEXT_PUBLIC_BACKEND_URL,
      fetchOptions: {
        credentials: "include",
        headers: {
          Cookie: cookie,
        },
      },
    },
    false
  );

  const userQuery = await client?.query(CurrentUserDocument).toPromise();

  return { ...appProps, user: userQuery?.data?.me ?? undefined };
};
