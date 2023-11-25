import { FC, ButtonHTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { VariantProp, variants } from "../../variants";

const baseClasses = "border uppercase rounded-lg duration-300 relative";
const shadowBefore =
  "before:content-[''] before:h-[10px] before:left-[5%] before:opacity-0 before:pointer-events-none before:absolute " +
  "before:top-full before:w-[90%] before:z-[-1] before:transition-[transform,opacity] before:duration-300 " +
  "before:bg-button-shadow";
const shadowHover =
  "hover:bg-brand-800 hover:text-white hover:transform hover:translate-y-[-3px] hover:before:opacity-100 hover:before:translate-y-[3px]";
const shadow = [shadowBefore, shadowHover].join(" ");

const buttonVariants = variants(
  {
    solid: `${baseClasses} ${shadow} text-white bg-brand-800 border-none disabled:bg-opacity-50`,
    outlined: `${baseClasses} ${shadow} text-brand-800 border-brand-800 bg-white disabled:opacity-50`,
  },
  "solid"
);

const sizeVariants = variants(
  {
    tiny: "py-2 px-4 text-sm normal-case",
    small: "p-3 min-w-[200px] text-sm",
    medium: "p-4 min-w-[260px]",
  },
  "medium"
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProp<typeof buttonVariants> &
  VariantProp<typeof sizeVariants, "size">;

export const Button: FC<PropsWithChildren<ButtonProps>> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ type = "button", variant, size, className, ...rest }, ref) => {
  const builtClassName = buttonVariants(variant, sizeVariants(size), className);

  return <button ref={ref} type={type} {...rest} className={builtClassName} />;
});
Button.displayName = "Button";
