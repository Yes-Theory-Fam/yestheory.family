import { Img } from "@chakra-ui/react";
import { createContext, Component, FunctionalComponent } from "preact";

interface ImageRequiredProps {
  src: string;
}

export interface OverrideComponentType {
  Image:
    | Component<ImageRequiredProps>
    | FunctionalComponent<ImageRequiredProps>;
  wrapLink: (child: JSX.Element, href: string | undefined) => JSX.Element;
}

export const OverrideComponentContext = createContext<OverrideComponentType>({
  Image: Img,
  wrapLink: (child, href) => {
    child.props.href = href;
    return child;
  },
});
