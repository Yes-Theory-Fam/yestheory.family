"use client";

import { FC } from "react";
import { Link } from "ui";

export const BackLink: FC = () => {
  return (
    <Link href="#" onClick={() => history.back()}>
      back
    </Link>
  );
};
