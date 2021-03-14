declare module "*.css" {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module "*.scss" {
  const mapping: Record<string, string>;
  export default mapping;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.webp" {
  const content: any;
  export default content;
}
