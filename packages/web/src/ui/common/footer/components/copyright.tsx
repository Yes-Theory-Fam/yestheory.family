import { FC } from "react";

export const Copyright: FC = () => (
  <span className="text-sm text-gray-600 uppercase">
    &copy; YesTheoryFam {new Date().getFullYear()}
  </span>
);
