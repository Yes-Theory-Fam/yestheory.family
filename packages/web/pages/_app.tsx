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
import { FC } from "react";
import { withUrqlClient, initUrqlClient, NextUrqlAppContext } from "next-urql";
import { dedupExchange, cacheExchange, fetchExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";
import {
  navigateToLogin,
  UserConsumer,
  UserProvider,
} from "../context/user/user";
import { useLogoutMutation } from "../components/auth/logout.generated";
import App, { AppProps } from "next/app";
import { configuredAuthExchange } from "../lib/urql/configured-auth-exchange";
import { CookieConsent } from "../components/other/cookie-consent/cookie-consent";
import { User, CurrentUserDocument } from "../context/user/user.generated";

interface YTFAppProps extends AppProps {
  user: User;
}

const componentOverrides: OverrideComponentType = {
  Image,
  wrapLink: function LinkWrap(child, href) {
    return (
      <Link href={href ?? "#"} passHref>
        {child}
      </Link>
    );
  },
};

const YTFApp: FC<YTFAppProps> = ({ Component, pageProps, user }) => {
  const [, logout] = useLogoutMutation();

  return (
    <ChakraProvider theme={theme}>
      <UserProvider serverUser={user}>
        <OverrideComponentContext.Provider value={componentOverrides}>
          <Head>
            <title>YesTheory Family</title>
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

const UrqlWrappedApp = withUrqlClient((ssrExchange, ctx) => ({
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    configuredAuthExchange,
    ssrExchange,
    fetchExchange,
  ],
  url: ctx
    ? process.env.SERVER_BACKEND_GRAPHQL_URL
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  fetchOptions: {
    credentials: "include",
  },
}))(YTFApp);

export default UrqlWrappedApp;

UrqlWrappedApp.getInitialProps = async (
  context: NextUrqlAppContext
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
