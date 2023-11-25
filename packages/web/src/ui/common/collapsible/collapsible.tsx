"use client";

import { FC, PropsWithChildren, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import AnimateHeight from "react-animate-height";

export type CollapsibleProps = {
  title: string;
  defaultOpen?: boolean;
};

export const Collapsible: FC<PropsWithChildren<CollapsibleProps>> = ({
  title,
  defaultOpen = false,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(!defaultOpen);

  return (
    <div>
      <div
        className={"flex justify-between px-4 py-2 cursor-pointer select-none"}
        role={"button"}
        onClick={() => setCollapsed((c) => !c)}
      >
        <span>{title}</span>
        <ChevronDownIcon
          className={twMerge(
            "h-4 w-4 transition-transform duration-200",
            !collapsed && "rotate-180",
          )}
        />
      </div>

      <AnimateHeight height={collapsed ? 0 : "auto"} duration={200}>
        <div className={"p-4 border"}>{children}</div>
      </AnimateHeight>
    </div>
  );
};
