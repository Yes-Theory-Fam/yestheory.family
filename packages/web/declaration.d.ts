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

declare module "*.svg" {
  const content: string;
  export default content;
}

declare global {
  interface Windows {
    __URQL_DATA__: any | undefined;
  }
}
