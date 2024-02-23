import {twMerge} from 'tailwind-merge';

export const variants =
  <Variants extends Record<string, string>>(
    variantClassNames: Variants,
    defaultVariant: keyof Variants,
  ): ((
    variant: keyof Variants | undefined,
    ...classNamesToMerge: (string | undefined | false)[]
  ) => string) =>
  (variant, ...classNamesToMerge) =>
    twMerge(variantClassNames[variant ?? defaultVariant], ...classNamesToMerge);

type InferVariantKeysFromVarianted<Varianted> = Varianted extends (
  variant: infer X,
  ...classNamesToMerge: (string | undefined)[]
) => string
  ? X
  : never;

export type VariantProp<Varianted, Key extends string = 'variant'> = {
  [key in Key]?: InferVariantKeysFromVarianted<Varianted>;
};
