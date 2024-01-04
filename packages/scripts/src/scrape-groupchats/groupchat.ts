export type Groupchat = {
  name: string;
  url: string;
};

export type ProcessedGroupchat = Groupchat & {platform: string};
