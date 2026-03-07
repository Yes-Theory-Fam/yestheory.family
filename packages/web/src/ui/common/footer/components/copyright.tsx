import type { FC } from "react";

export const Copyright: FC = () => (
	<span className="text-gray-600 text-sm uppercase">
		&copy; YesTheoryFam {new Date().getFullYear()}
	</span>
);
