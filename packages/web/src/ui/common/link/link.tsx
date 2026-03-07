import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import type {
	AnchorHTMLAttributes,
	FC,
	PropsWithChildren,
	RefAttributes,
} from "react";
import { type VariantProp, variants } from "../../variants";

const colorVariants = variants(
	{
		inline: "text-brand-800",
		black: "text-gray-800",
	},
	"inline",
);

export type LinkProps = NextLinkProps &
	Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> &
	VariantProp<typeof colorVariants> & {
		active?: boolean;
		inverted?: boolean;
		hideUnderline?: boolean;
	} & RefAttributes<HTMLAnchorElement>;

export const Link: FC<PropsWithChildren<LinkProps>> = ({
	className,
	variant,
	active = false,
	inverted = false,
	hideUnderline,
	...rest
}) => (
	<NextLink
		className={colorVariants(
			variant,
			"border-transparent border-b-2 underline",
			active && (inverted ? "border-white" : "border-brand-800"),
			inverted && "text-white",
			!hideUnderline &&
				(inverted ? "hover:border-white" : "hover:border-brand-800"),
			className,
		)}
		{...rest}
	/>
);
