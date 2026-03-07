import {
	type DataFromCollectionSlug,
	type GeneratedTypes,
	getPayload,
	type JsonObject,
	type Payload,
	type TypedCollectionSelect,
} from "payload";

declare const payload: Payload;

type CollectionKey = keyof GeneratedTypes["collections"];

// Taken from payload internal types
export type DraftDataFromCollection<TData extends JsonObject> = Partial<
	Omit<
		TData,
		"collection" | "createdAt" | "deletedAt" | "id" | "sizes" | "updatedAt"
	>
> &
	Partial<
		Pick<
			TData,
			"collection" | "createdAt" | "deletedAt" | "id" | "sizes" | "updatedAt"
		>
	>;
export type DraftDataFromCollectionSlug<TSlug extends CollectionKey> =
	DraftDataFromCollection<DataFromCollectionSlug<TSlug>>;

type CreateOptions<T extends CollectionKey> = Parameters<
	typeof payload.create<T, TypedCollectionSelect[T]>
>[0];
type UpdateOptions<T extends CollectionKey> = Parameters<
	typeof payload.update<T, TypedCollectionSelect[T]>
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
	const config = await import("@payload-config");
	const payload = await getPayload({ config: config.default });

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
		await payload.update({ id, ...options, context: { dataseeder: true } });
		console.info(`${collection}: Updated ${keyValue}`);
	} else {
		await payload.create({
			...options,
			data: options.data as DraftDataFromCollectionSlug<T>,
			context: { dataseeder: true },
			draft: true,
		});
		console.info(`${collection}: Created ${keyValue}`);
	}
};
