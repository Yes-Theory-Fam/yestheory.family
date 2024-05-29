import {type Groupchat} from '../../../payload-types';
import {upsert} from './upsert';

const keywords: Record<string, number> = {};

let keywordId = 0;
const seedKeywords = async () => {
  const keywordValues = ['Hamburg', 'Germany', 'Europe', 'Global'];
  for (const keyword of keywordValues) {
    await upsert({
      collection: 'groupchat-keywords',
      key: 'value',
      data: {
        id: keywordId++,
        value: keyword,
      },
    });
    keywords[keyword] = keywordId;
  }
};

export const seedGroupchats = async () => {
  await seedKeywords();

  await upsert({
    collection: 'groupchats',
    key: 'name',
    data: {
      name: 'Yes Famburg',
      description: 'Hamburgs YesFam group on WhatsApp',
      platform: 'whatsapp',
      url: 'https://chat.whatsapp.com/example',
      keywords: [keywords['Hamburg'], keywords['Germany'], keywords['Europe']],
      promoted: 0,
    } satisfies Partial<Groupchat>,
  });

  await upsert({
    collection: 'groupchats',
    key: 'name',
    data: {
      name: 'Yes Theory Fam Discord',
      description:
        'The semi-official community run Discord server of the Yes Fam',
      platform: 'discord',
      url: 'https://discord.gg/yestheory',
      keywords: [keywords['Global']],
      promoted: 100,
    } satisfies Partial<Groupchat>,
  });
};
