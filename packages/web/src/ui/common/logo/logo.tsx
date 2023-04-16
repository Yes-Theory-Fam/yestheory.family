import { FC } from "react";
import { variants, VariantProp } from "../../variants";

const sizeVariants = variants(
  {
    small: "w-[50px]",
    medium: "w-[100px]",
    large: "w-[200px]",
  },
  "medium"
);

type LogoColorVariant = "color" | "white";

export type LogoProps = {
  variant?: LogoColorVariant;
  className?: string;
} & VariantProp<typeof sizeVariants, "size">;

export const Logo: FC<LogoProps> = ({ size, className, variant = "color" }) => {
  const baseFill = variant === "white" ? "fill-white" : "fill-gray-800";
  const famFill = variant === "white" ? "fill-white" : "fill-brand-800";

  return (
    <div className={sizeVariants(size, baseFill, className, "font-black")}>
      <svg viewBox="0 0 33.787568 17.315006">
        <g>
          <text x=".021" y="10.118" fontSize={14.039}>
            YES
          </text>
          <text x=".042" y="17.251" fontSize={6.537}>
            THEORY
          </text>
          <text
            x="-.489"
            y="-27.315"
            fontSize={9.104}
            transform="rotate(90)"
            className={famFill}
          >
            FAM
          </text>
        </g>
      </svg>
    </div>
  );
};
