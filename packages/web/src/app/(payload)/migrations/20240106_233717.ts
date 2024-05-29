import {
  type MigrateUpArgs,
  type MigrateDownArgs,
} from '@payloadcms/db-postgres';
import {sql} from 'drizzle-orm';

export async function up({payload}: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

ALTER TYPE "enum_groupchats_platform" ADD VALUE 'instagram';
CREATE TABLE IF NOT EXISTS "feature" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"path_prefix" varchar NOT NULL,
	"nav_path" varchar,
	"enabled" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

DROP INDEX IF EXISTS "name_idx";
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "feature" ("created_at");`);
}

export async function down({payload}: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE "feature";
CREATE UNIQUE INDEX IF NOT EXISTS "name_idx" ON "groupchats" ("name");`);
}
