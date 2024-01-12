import {decode} from 'html-entities';
import {type Groupchat, type ProcessedGroupchat} from './groupchat.js';
import {handleBitLy} from './platform-handlers/bit-ly.js';
import {handleLinkTree} from './platform-handlers/link-tree.js';

const platformDomainFinder =
  /https?:\/\/.*?(facebook.com|instagram.com|chat.whatsapp.com|discord.gg|discord.com|t.me).*$/i;

const domainMap: Record<string, string> = {
  'facebook.com': 'facebook',
  'instagram.com': 'instagram',
  'chat.whatsapp.com': 'whatsapp',
  'discord.gg': 'discord',
  'discord.com': 'discord',
  't.me': 'telegram',
};

export const postProcess = async (
  groupchats: Groupchat[],
): Promise<ProcessedGroupchat[]> => {
  const knownUrls = new Set<string>();
  const validPlatformGroupchats: ProcessedGroupchat[] = [];

  for (const groupchat of groupchats) {
    if (groupchat.url.match(/^https?:\/\/bit.ly\/.*$/i)) {
      groupchat.url = await handleBitLy(groupchat.url);
      console.info(`Updated ${groupchat.name} from bit.ly: ${groupchat.url}`);
    }

    const parsedUrl = new URL(groupchat.url);
    parsedUrl.search = '';
    groupchat.url = parsedUrl.toString();

    if (knownUrls.has(groupchat.url)) {
      console.info(`Skipping known URL ${groupchat.url}`);
      continue;
    }

    knownUrls.add(groupchat.url);

    if (groupchat.url.match(/^https?:\/\/linktr.ee\/.*$/i)) {
      const newChats = await handleLinkTree(groupchat.url);
      console.info(`Added ${newChats.length} from link-tree: ${groupchat.url}`);
      groupchats.push(...newChats);
      continue;
    }

    const platformMatch = groupchat.url.match(platformDomainFinder);
    if (!platformMatch) {
      console.error(
        `Unable to determine platform from url ${groupchat.url} with name ${groupchat.name}! Skipping...`,
      );
      continue;
    }

    const platformDomain = platformMatch[1];
    const platform = domainMap[platformDomain];
    if (!platform) {
      console.error(
        `Missing platform definition for ${platformDomain}, skipping...`,
      );
      continue;
    }

    // We might scrape things like &amp;
    groupchat.name = decode(groupchat.name);

    validPlatformGroupchats.push({...groupchat, platform});
  }

  return validPlatformGroupchats;
};
