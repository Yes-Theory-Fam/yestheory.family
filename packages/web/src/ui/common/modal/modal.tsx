"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import {
	Close,
	Content,
	Description,
	Overlay,
	Portal,
	Root,
	Title,
} from "@radix-ui/react-dialog";
import type { PropsWithChildren } from "react";
import { Button, type ButtonProps } from "../button/button";
import { Heading } from "../heading/heading";

export type ModalActionButton = Omit<ButtonProps, "children"> & {
	text: string;
};

export type ModalProps = {
	title: string;
	ariaTitle: string;
	actions: ModalActionButton[];
	onCancel?: () => void;
};

export const Modal = ({
	title,
	ariaTitle,
	onCancel,
	actions,
	children,
}: PropsWithChildren<ModalProps>) => (
	<Root open>
		<Portal>
			<Overlay className="fixed inset-0 z-50 bg-gray-500/30 backdrop-blur-xs">
				<Content
					aria-label={ariaTitle}
					className="relative inset-0 top-1/2 mx-auto flex max-w-2xl -translate-y-1/2 flex-col items-start justify-between gap-6 rounded-sm bg-white p-4 shadow-lg md:p-8"
				>
					<Title asChild>
						<Heading size="h3" frontText={title} />
					</Title>

					{onCancel && (
						<Close asChild>
							<button
								type="button"
								onClick={onCancel}
								className="absolute top-4 right-4 p-2"
								aria-label="Close"
							>
								<XMarkIcon className="size-8 text-gray-600" />
							</button>
						</Close>
					)}

					<Description asChild>
						{/* The fragment ensures only one child is passed to SlotClone of Radix */}
						{children}
					</Description>

					<div className="mt-6 flex w-full flex-col justify-center gap-4 md:flex-row md:justify-end">
						{actions.map(({ text, ...props }) => (
							<Close key={text} asChild>
								<Button {...props}>{text}</Button>
							</Close>
						))}
					</div>
				</Content>
			</Overlay>
		</Portal>
	</Root>
);
