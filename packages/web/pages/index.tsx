import Link from "next/link";
import { ScssExample, NavLink } from "@project/ui";
import { Button } from "@chakra-ui/react";
import { useExampleQuery } from "../src/example.generated";
import { withUrqlClient } from "next-urql";

function Home() {
  const [query] = useExampleQuery();
  const { data, fetching, error } = query;

  if (fetching) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;
  console.log(data);

  return (
    <>
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
    </>
  );
}

export default withUrqlClient(() => ({
  url:
    typeof window === "undefined"
      ? process.env.SERVER_BACKEND_URL
      : process.env.NEXT_PUBLIC_BACKEND_URL,
}))(Home);
