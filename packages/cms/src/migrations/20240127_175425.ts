import {
  type MigrateUpArgs,
  type MigrateDownArgs,
} from '@payloadcms/db-postgres';
import {sql} from 'drizzle-orm';

export async function up({payload}: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric
);

CREATE TABLE IF NOT EXISTS "feature_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

ALTER TABLE "feature" ADD COLUMN "description" varchar NOT NULL;
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "media" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "filename_idx" ON "media" ("filename");
CREATE INDEX IF NOT EXISTS "order_idx" ON "feature_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "feature_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "feature_rels" ("path");
DO $$ BEGIN
 ALTER TABLE "feature_rels" ADD CONSTRAINT "feature_rels_parent_id_feature_id_fk" FOREIGN KEY ("parent_id") REFERENCES "feature"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "feature_rels" ADD CONSTRAINT "feature_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({payload}: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DROP TABLE "media";
DROP TABLE "feature_rels";
ALTER TABLE "feature" DROP COLUMN IF EXISTS "description";`);
}
