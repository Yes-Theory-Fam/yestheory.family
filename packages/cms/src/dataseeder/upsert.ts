import payload from "payload";
import { type Config as GeneratedTypes } from "payload/generated-types";

type CollectionKey = keyof GeneratedTypes["collections"];
type CreateOptions<T extends CollectionKey> = Parameters<
  typeof payload.create<T>
>[0];
type UpdateOptions<T extends CollectionKey> = Parameters<
  typeof payload.update<T>
>[0];

type CollectionField<T extends CollectionKey> =
  keyof GeneratedTypes["collections"][T];

type UpsertArgs<T extends CollectionKey> = {
  collection: T;
  data: Partial<GeneratedTypes["collections"][T]>;
  key: CollectionField<T> | CollectionField<T>[];
} & Omit<CreateOptions<T> & UpdateOptions<T>, "id" | "where">;

export const upsert = async <T extends CollectionKey>(
  optionsAndKey: UpsertArgs<T>,
) => {
  const { key, ...options } = optionsAndKey;
  const firstKey: CollectionField<T> = Array.isArray(key) ? key[0] : key;
  const keyValue = options.data[firstKey];
  const collection = options.collection;

  const where = {
    and: (Array.isArray(key) ? key : [key]).map((k) => ({
      [k]: { equals: options.data[k] },
    })),
  };
  const { totalDocs, docs } = await payload.find({
    collection,
    where,
    limit: 2,
    depth: 0,
  });

  if (totalDocs > 1) throw new Error("Key is not unique");
  if (totalDocs === 1) {
    const id = docs[0].id;
    await payload.update({ id, ...options });
    console.info(`${collection}: Updated ${keyValue}`);
  } else {
    await payload.create({ ...options });
    console.info(`${collection}: Created ${keyValue}`);
  }
};
