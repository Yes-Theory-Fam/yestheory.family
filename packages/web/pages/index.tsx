import Link from "next/link";
import { theme } from "@project/ui";
import { ChakraProvider, Button } from "@chakra-ui/react";
import { useExampleQuery } from "../src/example.generated";

export default function Home() {
  const [query] = useExampleQuery();
  const { data, fetching, error } = query;

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  console.log(data);

  return (
    <ChakraProvider theme={theme}>
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
