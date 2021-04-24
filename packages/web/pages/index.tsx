import Link from "next/link";
import {
  ScssExample,
  theme,
  NavLink,
  OverrideComponentContext,
  OverrideComponentType,
} from "@project/ui";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { useExampleQuery } from "../src/example.generated";
import { withUrqlClient } from "next-urql";
import Image from "next/image";

const componentOverrides: OverrideComponentType = {
  Image,
  wrapLink: (child, href) => (
    <Link href={href} passHref>
      {child}
    </Link>
  ),
};

function Home() {
  const [query] = useExampleQuery();
  const { data, fetching, error } = query;

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  console.log(data);

  return (
    <ChakraProvider theme={theme}>
      <OverrideComponentContext.Provider value={componentOverrides}>
        <ScssExample />

        <div>
          <Button variant="outlined">SuperButton</Button>
          Hello World.{" "}
          <ul>
            <li>
              <NavLink href="/about">About</NavLink>
            </li>
            <li>
              <Link href="/ssr">
                <a>SSR</a>
              </Link>
            </li>
            <li>
              <Link href="/ssg">
                <a>SSG</a>
              </Link>
            </li>
          </ul>
        </div>
      </OverrideComponentContext.Provider>
    </ChakraProvider>
  );
}

export default withUrqlClient(() => ({
  url:
    typeof window === "undefined"
      ? process.env.SERVER_BACKEND_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL,
}))(Home);
