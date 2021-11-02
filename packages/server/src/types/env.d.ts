declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    FRONTEND_HOST: string;
    PRISMA_DATABASE_URL: string;
    DISCORD_BOT_TOKEN: string;
    DISCORD_TARGET_GUILD: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    DISCORD_SCOPES: string;
  }
}
