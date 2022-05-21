import { FC } from "react";
import { Box, Icon, useTheme } from "@chakra-ui/react";

import styles from "./Logo.module.scss";

export type LogoSize = "sm" | "md" | "lg";
export type LogoVariant = "color" | "white";

export interface LogoProps {
  size?: LogoSize | (LogoSize | null)[];
  variant?: LogoVariant;
}

export const Logo: FC<LogoProps> = ({ size = "md", variant = "color" }) => {
  const sizeMap: Record<LogoSize, number> = {
    sm: 50,
    md: 100,
    lg: 200,
  };
  const theme = useTheme();

  const baseFill = variant === "white" ? "white" : "gray.800";
  const famFill = variant === "white" ? "white" : theme.colors.brand["800"];

  const width = Array.isArray(size)
    ? size.map((s) => (s ? `${sizeMap[s]}px` : null))
    : `${sizeMap[size]}px`;

  return (
    <Box w={width} className={styles.logo} fill={baseFill}>
      <Icon viewBox="0 0 33.787568 17.315006" boxSize="unset">
        <g>
          <text x=".021" y="10.118" className={styles.yes}>
            YES
          </text>
          <text x=".042" y="17.251" className={styles.theory}>
            THEORY
          </text>
          <text
            x="-.489"
            y="-27.315"
            transform="rotate(90)"
            fill={famFill}
            className={styles.fam}
          >
            FAM
          </text>
        </g>
      </Icon>
    </Box>
  );
};
