import {type ProcessedGroupchat} from './groupchat.js';

export const createInPayload = async (
  groupchats: ProcessedGroupchat[],
  apiUrl: string,
  apiKey: string,
) => {
  const response = await fetch(`${apiUrl}/groupchats/create-many`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `users API-Key ${apiKey}`,
    },
    body: JSON.stringify(groupchats),
  });

  if (response.status !== 200) {
    const body = await response.text();

    console.error(
      `Failed creating groupchats in payload: ${JSON.stringify(body, null, 2)}`,
    );
  }
};
