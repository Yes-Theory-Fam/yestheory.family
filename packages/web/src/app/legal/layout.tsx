import { FC, PropsWithChildren } from "react";

const LegalLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="mt-16 md:mt-24 mx-4 md:mx-8 xl:mx-auto text-left flex flex-col items-start">
      {children}
    </div>
  );
};

export default LegalLayout;
