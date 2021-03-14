declare module "*.css" {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module "*.scss" {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.webp" {
  const content: string;
  export default content;
}
