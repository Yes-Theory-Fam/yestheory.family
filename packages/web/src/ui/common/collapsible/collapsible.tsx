"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { type FC, type PropsWithChildren, useState } from "react";
import AnimateHeight from "react-animate-height";
import { twMerge } from "tailwind-merge";

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
			<button
				type="button"
				className="flex cursor-pointer select-none justify-between px-4 py-2"
				onClick={() => setCollapsed((c) => !c)}
			>
				<span>{title}</span>
				<ChevronDownIcon
					className={twMerge(
						"size-4 transition-transform duration-200",
						!collapsed && "rotate-180",
					)}
				/>
			</button>

			<AnimateHeight height={collapsed ? 0 : "auto"} duration={200}>
				<div className="border p-4">{children}</div>
			</AnimateHeight>
		</div>
	);
};
