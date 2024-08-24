import {
  type MigrateUpArgs,
  type MigrateDownArgs,
  sql,
} from '@payloadcms/db-postgres';

export async function up({payload}: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "feature_rels";
  ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_parent_id_users_id_fk";
  
  ALTER TABLE "groupchats_rels" DROP CONSTRAINT "groupchats_rels_parent_id_groupchats_id_fk";
  
  ALTER TABLE "groupchats_rels" DROP CONSTRAINT "groupchats_rels_groupchat_keywords_id_groupchat_keywords_id_fk";
  
  ALTER TABLE "groupchats_rels" DROP CONSTRAINT "groupchats_rels_users_id_users_id_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_id_users_id_fk";
  
  DROP INDEX IF EXISTS "order_idx";
  DROP INDEX IF EXISTS "parent_idx";
  DROP INDEX IF EXISTS "created_at_idx";
  DROP INDEX IF EXISTS "filename_idx";
  DROP INDEX IF EXISTS "path_idx";
  ALTER TABLE "groupchats" ALTER COLUMN "show_unauthenticated" SET DEFAULT false;
  ALTER TABLE "groupchats" ALTER COLUMN "promoted" SET DEFAULT 0;
  ALTER TABLE "feature" ALTER COLUMN "description" DROP DEFAULT;
  ALTER TABLE "media" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "feature" ADD COLUMN "teaser_image_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "groupchats_rels" ADD CONSTRAINT "groupchats_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."groupchats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "groupchats_rels" ADD CONSTRAINT "groupchats_rels_groupchat_keywords_fk" FOREIGN KEY ("groupchat_keywords_id") REFERENCES "public"."groupchat_keywords"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "groupchats_rels" ADD CONSTRAINT "groupchats_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "feature" ADD CONSTRAINT "feature_teaser_image_id_media_id_fk" FOREIGN KEY ("teaser_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "groupchats_created_at_idx" ON "groupchats" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "groupchats_rels_order_idx" ON "groupchats_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "groupchats_rels_parent_idx" ON "groupchats_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "groupchats_rels_path_idx" ON "groupchats_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "groupchat_keywords_created_at_idx" ON "groupchat_keywords" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "feature_created_at_idx" ON "feature" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);
}

export async function down({payload}: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TABLE IF NOT EXISTS "feature_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "users_roles" DROP CONSTRAINT "users_roles_parent_fk";
  
  ALTER TABLE "groupchats_rels" DROP CONSTRAINT "groupchats_rels_parent_fk";
  
  ALTER TABLE "groupchats_rels" DROP CONSTRAINT "groupchats_rels_groupchat_keywords_fk";
  
  ALTER TABLE "groupchats_rels" DROP CONSTRAINT "groupchats_rels_users_fk";
  
  ALTER TABLE "feature" DROP CONSTRAINT "feature_teaser_image_id_media_id_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_parent_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_fk";
  
  DROP INDEX IF EXISTS "users_roles_order_idx";
  DROP INDEX IF EXISTS "users_roles_parent_idx";
  DROP INDEX IF EXISTS "users_created_at_idx";
  DROP INDEX IF EXISTS "media_created_at_idx";
  DROP INDEX IF EXISTS "media_filename_idx";
  DROP INDEX IF EXISTS "groupchats_created_at_idx";
  DROP INDEX IF EXISTS "groupchats_rels_order_idx";
  DROP INDEX IF EXISTS "groupchats_rels_parent_idx";
  DROP INDEX IF EXISTS "groupchats_rels_path_idx";
  DROP INDEX IF EXISTS "groupchat_keywords_created_at_idx";
  DROP INDEX IF EXISTS "feature_created_at_idx";
  DROP INDEX IF EXISTS "payload_preferences_key_idx";
  DROP INDEX IF EXISTS "payload_preferences_created_at_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_order_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_parent_idx";
  DROP INDEX IF EXISTS "payload_preferences_rels_path_idx";
  DROP INDEX IF EXISTS "payload_migrations_created_at_idx";
  ALTER TABLE "groupchats" ALTER COLUMN "show_unauthenticated" DROP DEFAULT;
  ALTER TABLE "groupchats" ALTER COLUMN "promoted" DROP DEFAULT;
  ALTER TABLE "feature" ALTER COLUMN "description" SET DEFAULT '';
  DO $$ BEGIN
   ALTER TABLE "feature_rels" ADD CONSTRAINT "feature_rels_parent_id_feature_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."feature"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "feature_rels" ADD CONSTRAINT "feature_rels_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "order_idx" ON "feature_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "parent_idx" ON "feature_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "path_idx" ON "feature_rels" USING btree ("path");
  DO $$ BEGIN
   ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "groupchats_rels" ADD CONSTRAINT "groupchats_rels_parent_id_groupchats_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."groupchats"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "groupchats_rels" ADD CONSTRAINT "groupchats_rels_groupchat_keywords_id_groupchat_keywords_id_fk" FOREIGN KEY ("groupchat_keywords_id") REFERENCES "public"."groupchat_keywords"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "groupchats_rels" ADD CONSTRAINT "groupchats_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "created_at_idx" ON "users" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "created_at_idx" ON "groupchats" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "order_idx" ON "groupchats_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "parent_idx" ON "groupchats_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "path_idx" ON "groupchats_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "created_at_idx" ON "groupchat_keywords" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "created_at_idx" ON "feature" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_migrations" USING btree ("created_at");
  ALTER TABLE "media" DROP COLUMN IF EXISTS "thumbnail_u_r_l";
  ALTER TABLE "feature" DROP COLUMN IF EXISTS "teaser_image_id";`);
}
