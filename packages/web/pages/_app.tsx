import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  Footer,
  Navigation,
  OverrideComponentContext,
  OverrideComponentType,
  theme,
} from "@yestheory.family/ui";
import { AppContext, AppProps, default as App } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FunctionalComponent } from "preact";
import { withUrqlClient } from "next-urql";
import { dedupExchange, cacheExchange, ssrExchange, fetchExchange } from "urql";
import { devtoolsExchange } from "@urql/devtools";
import { UserConsumer, UserProvider } from "../context/user/user";
import cookie from "cookie";

interface YTFAppProps extends AppProps {
  authenticated: boolean;
}

const componentOverrides: OverrideComponentType = {
  Image,
  wrapLink: function LinkWrap(child, href) {
    console.log("Wrapping a link with href", href, "in a Next link");

    return (
      <Link href={href} passHref>
        {child}
      </Link>
    );
  },
};

const storeAndNavigate = () => {
  const lastLocation = window.location.href;
  const domain = window.location.hostname;
  document.cookie = `last_location=${lastLocation};domain=${domain};path=/`;
  window.location.href = "http://localhost:5000/oauth/discord";
};

const YTFApp: FunctionalComponent<YTFAppProps> = ({ Component, pageProps, authenticated }) => {
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
          </Head>
          <UserConsumer>
            {(context) => (
              <Navigation
                links={[]}
                onLoginButtonClick={storeAndNavigate}
                user={context.user}
              />
            )}
          </UserConsumer>
          <Component {...pageProps} />
          <Box pt={6} bg={"white"}>
            <Footer links={[]} />
          </Box>
        </OverrideComponentContext.Provider>
      </UserProvider>
    </ChakraProvider>
  );
};

const isServerSide = typeof window === "undefined";

const ssr = ssrExchange({
  isClient: !isServerSide,
  initialState: !isServerSide ? window.__URQL_DATA__ : undefined,
});

const IdkApp = withUrqlClient(() => ({
  exchanges: [
    devtoolsExchange,
    dedupExchange,
    cacheExchange,
    ssr,
    fetchExchange,
  ],
  url:
    typeof window === "undefined"
      ? process.env.SERVER_BACKEND_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL,
  fetchOptions: {
    credentials: "include",
  },
}))(YTFApp);

export default IdkApp;

// IdkApp.getInitialProps = async (
//   context: AppContext
// ): Promise<Partial<YTFAppProps>> => {
//   const appProps = App.getInitialProps(context);

//   const request = context.ctx.req;
//   const cookies = request ? cookie.parse(request.headers.cookie || "") : {};

//   const authenticated = !!cookies["koa.sess"];
//   return { ...appProps, authenticated };
// };
