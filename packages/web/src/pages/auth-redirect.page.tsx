import { FC } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const stringifyUrlParam = (x: string | string[] | undefined): string =>
  !x ? "" : Array.isArray(x) ? x.join("") : x;

const AuthRedirect: FC = () => {
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