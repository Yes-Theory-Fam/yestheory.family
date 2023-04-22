"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren } from "react";
import { Heading } from "../heading/heading";
import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Close,
  Description,
} from "@radix-ui/react-dialog";
import { Button, ButtonProps } from "../button/button";

export type ModalActionButton = Omit<ButtonProps, "children"> & {
  text: string;
};

export type ModalProps = {
  title: string;
  actions: ModalActionButton[];
  onCancel?: () => void;
};

export const Modal = ({
  title,
  onCancel,
  actions,
  children,
}: PropsWithChildren<ModalProps>) => (
  <Root open={true}>
    <Portal>
      <Overlay className="fixed inset-0 bg-gray-500/30 z-50">
        <Content className="flex flex-col justify-between items-start gap-6 bg-white p-4 md:p-8 rounded mx-auto max-w-2xl shadow relative inset-0 top-1/2 -translate-y-1/2">
          <Title asChild>
            <Heading size={"h3"} frontText={title} />
          </Title>

          {onCancel && (
            <Close asChild>
              <button
                type="button"
                onClick={onCancel}
                className="p-2 absolute top-4 right-4"
                aria-label={"Close"}
              >
                <XMarkIcon className="h-8 w-8 text-gray-600" />
              </button>
            </Close>
          )}

          <Description asChild>
            {/* The fragment ensures only one child is passed to SlotClone of Radix */}
            <>{children}</>
          </Description>

          <div
            className={
              "w-full mt-6 flex flex-col md:flex-row gap-4 justify-center md:justify-end"
            }
          >
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
