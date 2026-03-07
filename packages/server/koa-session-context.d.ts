import 'koa';

declare module 'koa' {
  interface BaseContext {
    session: session.Session | null;
    readonly sessionOptions: session.opts | undefined;
  }
}
