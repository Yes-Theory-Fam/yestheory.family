import { useState } from "preact/hooks";
import { useBreakpointValue } from "@chakra-ui/react";
import { NavigationBreakpoints } from "../../Navigation/NavigationBreakpoints";
import { useIsomorphicLayoutEffect } from "react-use";

export type UseNavbarHeight = () => number;

const getValue = () => {
  if (typeof window === "undefined") return 0;

  const domNav = document.querySelector("#navigation");
  return domNav?.getBoundingClientRect().height ?? 0;
};

export const useNavbarHeight: UseNavbarHeight = () => {
  const [navbarHeight, setNavbarHeight] = useState(() => getValue());
  const currentBreakpoint = useBreakpointValue(NavigationBreakpoints);
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setNavbarHeight(getValue());
  }, [currentBreakpoint]);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? navbarHeight : 50;
};
