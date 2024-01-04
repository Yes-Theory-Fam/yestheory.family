import prompts from '@posva/prompts';
import {config} from 'dotenv';
import {createInPayload} from './create-in-payload.js';
import {postProcess} from './post-process.js';
import {nlGoogleSheetSource} from './sources/nl-google-sheet.js';
import {type GroupchatSourceFunction} from './sources/source-function.js';
import {wixSource} from './sources/wixsite.js';

config();

const sources: GroupchatSourceFunction[] = [wixSource, nlGoogleSheetSource];

const main = async () => {
  const confirmedStart = (
    await prompts({
      type: 'confirm',
      name: 'confirm',
      message: `Starting scraping across ${sources.length} sources. Confirm?`,
      initial: true,
    })
  ).confirm;

  if (!confirmedStart) return;

  const {payloadApiBaseUrl, payloadApiKey} = await prompts([
    {
      type: 'text',
      name: 'payloadApiBaseUrl',
      message: 'Payload API Base URL',
      initial: 'http://localhost:3001/api',
    },
    {
      type: 'password',
      name: 'payloadApiKey',
      message: 'Payload API Key',
    },
  ]);

  const collectedChats = await Promise.all(sources.map((s) => s()));
  const flatChats = collectedChats.flat();
  const processed = await postProcess(flatChats);

  console.info(
    `Scraped and processed ${processed.length} chats from ${sources.length} sources.\nInserting into Payload`,
  );

  await createInPayload(processed, payloadApiBaseUrl, payloadApiKey);

  console.info('Done inserting.');
};

await main();
