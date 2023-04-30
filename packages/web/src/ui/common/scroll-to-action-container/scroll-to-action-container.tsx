"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { type FC, type PropsWithChildren, useRef } from "react";

export type ScrollToActionContainerProps = {
  text: string;
};

export const ScrollToActionContainer: FC<
  PropsWithChildren<ScrollToActionContainerProps>
> = ({ children, text }) => {
  const selfRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    const navBarElement = document.querySelector("#navigation");
    if (!navBarElement) {
      throw new Error(
        "Failed to resolve #navigation element to determine scroll amount. Make sure an element with that ID exists!"
      );
    }

    const navbarHeight = navBarElement.getBoundingClientRect().height;
    const selfHeight = selfRef.current?.getBoundingClientRect().height ?? 0;

    window.scroll({
      top: selfHeight - navbarHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={selfRef}
      className="min-h-screen flex flex-col justify-center items-center relative"
    >
      {children}
      <button
        className="absolute bottom-3 cursor-pointer left-[50%] -translate-x-1/2 flex flex-col items-center left text-brand-800"
        onClick={scrollToContent}
      >
        <p className="text-xs uppercase">{text}</p>
        <ChevronDownIcon className="w-6 h-6" />
      </button>
    </div>
  );
};
