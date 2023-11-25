import { upsert } from "./upsert";

export const seedGroupchats = async () => {
  await upsert({
    collection: "groupchats",
    key: "name",
    data: {
      name: "Yes Famburg",
      description: "Hamburgs YesFam group on WhatsApp",
      platform: "whatsapp",
      url: "https://example.com",
      keywords: [
        { value: "Hamburg" },
        { value: "Germany" },
        { value: "Europe" },
      ],
    },
  });
};
