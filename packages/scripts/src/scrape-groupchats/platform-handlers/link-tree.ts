import {parse} from 'node-html-parser';
import {type Groupchat} from '../groupchat.js';

export const handleLinkTree = async (url: string): Promise<Groupchat[]> => {
  const response = await fetch(url);
  const body = await response.text();
  const document = parse(body);

  return document
    .querySelectorAll('a:not([href^="https://linktr.ee"])')
    .filter((e) => e.getAttribute('href')?.startsWith('http'))
    .map((e) => ({
      name: e.innerText || 'TODO fill in missing name',
      url: e.getAttribute('href') ?? 'blank href attribute',
    }));
};
