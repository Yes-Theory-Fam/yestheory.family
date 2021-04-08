import Link from "next/link";
import { ScssExample, theme } from "@project/ui";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { useExampleQuery } from "../src/example.generated";
import { withUrqlClient } from "next-urql";

function Home() {
  const [query] = useExampleQuery();
  const { data, fetching, error } = query;

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  console.log(data);

  return (
    <ChakraProvider theme={theme}>
      <ScssExample />

      <div>
        <Button variant="outlined">SuperButton</Button>
        Hello World.{" "}
        <ul>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
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
    </ChakraProvider>
  );
}

export default withUrqlClient(() => ({ url: "http://localhost:5000/graphql" }))(
  Home
);
