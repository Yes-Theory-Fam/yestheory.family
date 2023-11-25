import { type CollectionConfig } from "payload/types";

export const Groupchats: CollectionConfig = {
  slug: "groupchats",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "url", "platform"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      unique: true,
      required: true,
    },
    {
      name: "url",
      type: "text",
      required: true,
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (value && !value.match(/^https?:\/\//i)) {
              return `https://${value}`;
            }

            return value;
          },
        ],
      },
    },
    {
      name: "keywords",
      type: "array",
      required: true,
      fields: [{ name: "value", type: "text" }],
    },
    { name: "description", type: "text" },
    {
      name: "platform",
      type: "select",
      required: true,
      options: [
        { label: "Discord", value: "discord" },
        { label: "Facebook", value: "facebook" },
        { label: "Signal", value: "signal" },
        { label: "Telegram", value: "telegram" },
        { label: "WhatsApp", value: "whatsapp" },
      ],
    },
  ],
};
