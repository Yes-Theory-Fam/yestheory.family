import {parse} from 'node-html-parser';
import {type Groupchat} from '../groupchat.js';
import {type GroupchatSourceFunction} from './source-function.js';

const urls = [
  'https://yesfam.wixsite.com/community/interests-and-subcommunities-1',
  'https://yesfam.wixsite.com/community/instagrams-and-discord',
  'https://yesfam.wixsite.com/community/location-subgroups-1',
];

export const wixSource: GroupchatSourceFunction = async () => {
  const groupchatBatches = await Promise.all(urls.map(scrapeFromWix));

  return groupchatBatches.flat();
};

const scrapeFromWix = async (url: string): Promise<Groupchat[]> => {
  const response = await fetch(url);
  const body = await response.text();
  const document = parse(body);

  const linkElements = document.querySelectorAll(
    "main a:not([href^='https://yesfam.wixsite.com'])",
  );

  return linkElements.map((a) => {
    let url = a.getAttribute('href') ?? 'blank href attribute';
    if (url.startsWith('http:')) {
      const snip = url.substring(4);
      url = 'https' + snip;
    }

    return {
      url,
      name: a.innerText,
    };
  });
};
