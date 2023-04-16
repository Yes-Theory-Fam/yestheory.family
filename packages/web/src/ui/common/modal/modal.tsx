import { XMarkIcon } from "@heroicons/react/20/solid";
import { PropsWithChildren } from "react";
import { Heading } from "../heading/heading";

export type ModalProps = {
  title: string;
  onCancel?: () => void;
};

export const Modal = ({
  title,
  onCancel,
  children,
}: PropsWithChildren<ModalProps>) => (
  <div className="fixed inset-0 bg-gray-500/30 z-50 flex items-center justify-center">
    <div className="bg-white p-4 md:p-8 rounded m-2 md:mx-6 lg:m-12 max-w-2xl shadow">
      <div className="flex justify-between items-start">
        <Heading size={"h3"} frontText={title} />
        {onCancel && (
          <button type="button" onClick={() => onCancel()} className="p-2">
            <XMarkIcon className="h-8 w-8 text-gray-600" />
          </button>
        )}
      </div>

      {children}
    </div>
  </div>
);
