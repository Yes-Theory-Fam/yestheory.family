import {
	type MigrateDownArgs,
	type MigrateUpArgs,
	sql,
} from "@payloadcms/db-postgres";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" varchar,
  	"media_id" integer,
  	"groupchats_id" integer,
  	"groupchat_keywords_id" integer,
  	"feature_id" integer
  );
  
  ALTER TABLE "groupchats" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_groupchats_platform";
  CREATE TYPE "public"."enum_groupchats_platform" AS ENUM('discord', 'facebook', 'signal', 'telegram', 'whatsapp', 'instagram');
  ALTER TABLE "groupchats" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_groupchats_platform" USING "platform"::"public"."enum_groupchats_platform";
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_groupchats_fk" FOREIGN KEY ("groupchats_id") REFERENCES "public"."groupchats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_groupchat_keywords_fk" FOREIGN KEY ("groupchat_keywords_id") REFERENCES "public"."groupchat_keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_feature_fk" FOREIGN KEY ("feature_id") REFERENCES "public"."feature"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_groupchats_id_idx" ON "payload_locked_documents_rels" USING btree ("groupchats_id");
  CREATE INDEX "payload_locked_documents_rels_groupchat_keywords_id_idx" ON "payload_locked_documents_rels" USING btree ("groupchat_keywords_id");
  CREATE INDEX "payload_locked_documents_rels_feature_id_idx" ON "payload_locked_documents_rels" USING btree ("feature_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "groupchats_updated_at_idx" ON "groupchats" USING btree ("updated_at");
  CREATE INDEX "groupchats_rels_groupchat_keywords_id_idx" ON "groupchats_rels" USING btree ("groupchat_keywords_id");
  CREATE INDEX "groupchats_rels_users_id_idx" ON "groupchats_rels" USING btree ("users_id");
  CREATE INDEX "groupchat_keywords_updated_at_idx" ON "groupchat_keywords" USING btree ("updated_at");
  CREATE INDEX "feature_teaser_image_idx" ON "feature" USING btree ("teaser_image_id");
  CREATE INDEX "feature_updated_at_idx" ON "feature" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
	await payload.db.drizzle.execute(sql`
   ALTER TABLE "payload_locked_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  ALTER TABLE "groupchats" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_groupchats_platform";
  CREATE TYPE "public"."enum_groupchats_platform" AS ENUM('discord', 'facebook', 'instagram', 'signal', 'telegram', 'whatsapp');
  ALTER TABLE "groupchats" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_groupchats_platform" USING "platform"::"public"."enum_groupchats_platform";
  DROP INDEX "users_updated_at_idx";
  DROP INDEX "media_updated_at_idx";
  DROP INDEX "groupchats_updated_at_idx";
  DROP INDEX "groupchats_rels_groupchat_keywords_id_idx";
  DROP INDEX "groupchats_rels_users_id_idx";
  DROP INDEX "groupchat_keywords_updated_at_idx";
  DROP INDEX "feature_teaser_image_idx";
  DROP INDEX "feature_updated_at_idx";
  DROP INDEX "payload_preferences_updated_at_idx";
  DROP INDEX "payload_preferences_rels_users_id_idx";
  DROP INDEX "payload_migrations_updated_at_idx";`);
}
