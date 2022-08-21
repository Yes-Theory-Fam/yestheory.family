import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { devtoolsExchange } from "@urql/devtools";
import {
  Footer,
  Navigation,
  OverrideComponentContext,
  OverrideComponentType,
  theme,
} from "@yestheory.family/ui";
import { withUrqlClient } from "next-urql";
import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { cacheExchange, dedupExchange, fetchExchange } from "urql";
import { useLogoutMutation } from "../components/auth/logout.generated";
import { CookieConsent } from "../components/cookie-consent/cookie-consent";
import {
  navigateToLogin,
  UserConsumer,
  UserProvider,
} from "../context/user/user";
import { configuredAuthExchange } from "../lib/urql/configured-auth-exchange";

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

const YTFApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [, logout] = useLogoutMutation();

  return (
    <ChakraProvider theme={theme}>
      <UserProvider>
        <OverrideComponentContext.Provider value={componentOverrides}>
          <Head>
            <title>YesTheory Family</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
            />
          </Head>
          <CookieConsent />
          <Flex
            minH={"100vh"}
            direction={"column"}
            justifyContent={"space-between"}
          >
            <UserConsumer>
              {(context) => (
                <Navigation
                  links={[]}
                  onLoginButtonClick={navigateToLogin}
                  menuItems={[
                    {
                      key: "logout",
                      onClick: () =>
                        logout({}).then(({ data }) => {
                          if (!data?.logout) return;

                          context.refetch();
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
          </Flex>
        </OverrideComponentContext.Provider>
      </UserProvider>
    </ChakraProvider>
  );
};

const UrqlWrappedApp = withUrqlClient(
  (ssrExchange, ctx) => ({
    exchanges: [
      devtoolsExchange,
      dedupExchange,
      cacheExchange,
      ssrExchange,
      configuredAuthExchange,
      fetchExchange,
    ],
    url: ctx ? process.env.SERVER_BACKEND_GRAPHQL_URL : "/graphql",
    requestPolicy: "cache-first",
    fetchOptions: {
      credentials: "include",
      headers: {
        cookie: ctx?.req?.headers.cookie ?? document.cookie,
      },
    },
  }),
  { ssr: true }
)(YTFApp);

export default UrqlWrappedApp;
