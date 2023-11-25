import { type CollectionConfig } from "payload/types";
import { typesenseClient } from "../lib/typesense";

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
      fields: [{ name: "value", type: "text", required: true }],
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
    {
      name: "promoted",
      type: "number",
      min: 0,
      max: 100,
      required: true,
      defaultValue: 0,
      admin: {
        description:
          "This value may be used to push results. A value of 0 means no promotion. Any value between 1 and 100 may be used to order promoted groupchats.",
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, context }) => {
        if ('dataseeder' in context && context.dataseeder) return;

        const typesenseDoc = {
          ...doc,
          keywords: doc.keywords.map((k) => k.value),
        };
        await typesenseClient
          .collections("groupchats")
          .documents()
          .upsert(typesenseDoc);
      },
    ],
    afterDelete: [
      async ({ id }) => {
        await typesenseClient
          .collections("groupchats")
          .documents()
          .delete(id.toString());
      },
    ],
  },
};
