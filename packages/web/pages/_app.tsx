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

const App: FunctionalComponent<AppProps> = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <OverrideComponentContext.Provider value={componentOverrides}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,900;1,400;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navigation links={[]} />
      <Box mt={[16, null, 24]} mb={6}>
        <Component {...pageProps} />
      </Box>
      <Footer links={[]} />
    </OverrideComponentContext.Provider>
  </ChakraProvider>
);

export default App;
