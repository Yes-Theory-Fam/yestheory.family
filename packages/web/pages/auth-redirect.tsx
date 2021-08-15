import { FunctionalComponent } from "preact";
import { useRouter } from "next/router";
import { useEffect } from "preact/hooks";

const stringifyUrlParam = (x: string | string[]): string =>
  Array.isArray(x) ? x.join("") : x;

const AuthRedirect: FunctionalComponent = () => {
  const router = useRouter();

  const { next, accessToken, refreshToken, expiresAt } = router.query;

  useEffect(() => {
    localStorage.setItem("accessToken", stringifyUrlParam(accessToken));
    localStorage.setItem("refreshToken", stringifyUrlParam(refreshToken));
    localStorage.setItem("expiresAt", stringifyUrlParam(expiresAt));

    const nextUrl = new URL(stringifyUrlParam(next));

    router
      .replace(nextUrl)
      .catch(() => console.log("This is basically Sentry!"));
  });

  return <div>TODO</div>;
};

export default AuthRedirect;
