import {
	type MigrateDownArgs,
	type MigrateUpArgs,
	sql,
} from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`

ALTER TABLE "groupchats" ALTER COLUMN "promoted" DROP NOT NULL;
ALTER TABLE "groupchats" ADD COLUMN "show_unauthenticated" boolean;`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`

ALTER TABLE "groupchats" ALTER COLUMN "promoted" SET NOT NULL;
ALTER TABLE "groupchats" DROP COLUMN IF EXISTS "show_unauthenticated";`);
}
