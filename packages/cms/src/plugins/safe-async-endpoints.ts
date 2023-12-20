import {type Config, type Endpoint, type PayloadHandler} from 'payload/config';

const safeAsyncHandler =
  (handler: PayloadHandler): PayloadHandler =>
  async (req, res, next) => {
    try {
      // Don't remove await; it's required to properly catch errors here and safely handle them!
      //   PayloadHandler is typed as having a return type of void but that's not always actually the case.
      await handler(req, res, next);
    } catch (e) {
      next(e);
    }
  };

const patchEndpoint = (endpoint: Endpoint): Endpoint => {
  const handler = Array.isArray(endpoint.handler)
    ? endpoint.handler.map(safeAsyncHandler)
    : safeAsyncHandler(endpoint.handler);

  return {...endpoint, handler};
};

export const safeAsyncEndpoints = (config: Config) => {
  config.endpoints = config.endpoints?.map(patchEndpoint) ?? [];
  for (const c of config.collections ?? []) {
    if (c.endpoints) {
      c.endpoints = c.endpoints.map(patchEndpoint);
    }
  }

  for (const g of config.globals ?? []) {
    if (g.endpoints) {
      g.endpoints = g.endpoints.map(patchEndpoint);
    }
  }

  return config;
};
