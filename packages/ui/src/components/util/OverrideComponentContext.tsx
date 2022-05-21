import { Img } from "@chakra-ui/react";
import { createContext, Component, FC, cloneElement } from "react";

interface ImageRequiredProps {
  src: string;
}

export interface OverrideComponentType {
  Image: Component<ImageRequiredProps> | FC<ImageRequiredProps>;
  wrapLink: (child: JSX.Element, href: string | undefined) => JSX.Element;
}

export const OverrideComponentContext = createContext<OverrideComponentType>({
  Image: Img,
  wrapLink: (child, href) => cloneElement(child, { href }),
});
