import {Client} from 'typesense';

const apiUrl = new URL(
  process.env.TYPESENSE_API_URL ?? 'http://localhost:8108',
);

const protocol = apiUrl.protocol;

export const typesenseClient = new Client({
  nodes: [
    {
      host: apiUrl.hostname,
      port: Number(apiUrl.port),
      protocol: protocol.substring(0, protocol.length - 1),
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY ?? '1234567890',
  connectionTimeoutSeconds: 2,
});

export const typesenseReady = async () => {
  const waitASecond = async () =>
    await new Promise((res) => setTimeout(res, 1000));

  let maxAttempts = 10;

  while (--maxAttempts) {
    const result = await typesenseClient.health.retrieve();
    if (result.ok) break;

    await waitASecond();
  }
};
