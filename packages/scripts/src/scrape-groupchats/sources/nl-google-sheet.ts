import {type Groupchat} from '../groupchat.js';
import {type GroupchatSourceFunction} from './source-function.js';

type SheetResponse = {
  range: string;
  majorDimension: 'ROWS';
  values: string[][];
};

export const nlGoogleSheetSource: GroupchatSourceFunction = async () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/1Bu3phshFxwx7my_O3ijjbWevC2q6P4aq6QeUe6Y7bfs/values/All chats?key=${apiKey}`;

  const response = await fetch(sheetsUrl);
  const parsedBody = (await response.json()) as SheetResponse;

  const groupchats: Groupchat[] = [];
  for (const row of parsedBody.values) {
    const name = row[0];
    const url = row[1];

    if (!url.startsWith('http')) continue;

    groupchats.push({name, url});
  }

  return groupchats;
};
