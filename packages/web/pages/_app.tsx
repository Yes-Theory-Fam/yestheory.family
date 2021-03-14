import { ChakraProvider } from "@chakra-ui/react";
import {
  OverrideComponentContext,
  OverrideComponentType,
  theme,
} from "@yestheory.family/ui";
import { AppProps } from "next/app";
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
      <Component {...pageProps} />
    </OverrideComponentContext.Provider>
  </ChakraProvider>
);

export default App;
