import { ComponentProps, FC } from "react";

export type ToggleButtonProps = Omit<
  ComponentProps<"input">,
  "onChange" | "type" | "className"
> & {
  label: string;
  onChange: (newValue: boolean) => void;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
  label,
  onChange,
  ...rest
}) => {
  return (
    <label className={"group cursor-pointer"}>
      <input
        type={"checkbox"}
        className={"peer hidden"}
        onChange={(e) => onChange(e.target.checked)}
        {...rest}
      />
      <span
        className={
          "bg-white text-sm p-2 border transition-colors border-brand-800 text-brand-800 group-hover:text-white group-hover:bg-brand-800 peer-checked:text-white peer-checked:bg-brand-800 rounded-lg"
        }
      >
        {label}
      </span>
    </label>
  );
};
