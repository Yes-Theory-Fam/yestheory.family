import {upsert} from './upsert';

export const seedGroupchats = async () => {
  await upsert({
    collection: 'groupchats',
    key: 'name',
    data: {
      name: 'Yes Famburg',
      description: 'Hamburgs YesFam group on WhatsApp',
      platform: 'whatsapp',
      url: 'https://example.com',
      keywords: [{value: 'Hamburg'}, {value: 'Germany'}, {value: 'Europe'}],
      promoted: 0,
    },
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
      keywords: [{value: 'Global'}],
      promoted: 100,
    },
  });
};
