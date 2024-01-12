export type Groupchat = {
  name: string;
  url: string;
  showUnauthenticated?: boolean;
};

export type ProcessedGroupchat = Groupchat & {platform: string};
