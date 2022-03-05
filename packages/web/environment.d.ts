declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    SERVER_BACKEND_GRAPHQL_URL: string;
    NEXT_PUBLIC_BACKEND_URL: string;
  }
}
