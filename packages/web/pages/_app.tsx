import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  OverrideComponentContext,
  OverrideComponentType,
  theme,
  Footer,
  Navigation,
} from "@yestheory.family/ui";
import { AppProps } from "next/app";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FunctionalComponent } from "preact";
import { withUrqlClient } from "next-urql";

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

const storeAndNavigate = () => {
  const lastLocation = window.location.href;
  const domain = window.location.hostname;
  document.cookie = `last_location=${lastLocation};domain=${domain};path=/`;
  window.location.href = "http://localhost:5000/oauth/discord";
};

const App: FunctionalComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <OverrideComponentContext.Provider value={componentOverrides}>
        <Head>
          <title>YesTheory Family</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,900;1,400;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Navigation links={[]} onLoginButtonClick={storeAndNavigate} />
        <Component {...pageProps} />
        <Box pt={6} bg={"white"}>
          <Footer links={[]} />
        </Box>
      </OverrideComponentContext.Provider>
    </ChakraProvider>
  );
};

export default withUrqlClient(() => ({
  url:
    typeof window === "undefined"
      ? process.env.SERVER_BACKEND_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL,
  fetchOptions: {
    credentials: "include",
  },
}))(App);
