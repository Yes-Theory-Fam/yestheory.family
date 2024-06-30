import {
  type MigrateUpArgs,
  type MigrateDownArgs,
} from '@payloadcms/db-postgres';
import {sql} from 'drizzle-orm';

export async function up({payload}: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_roles" AS ENUM('owner', 'groupchats-admin', 'groupchats');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users_roles" (
	"order" integer NOT NULL,
	"parent_id" varchar NOT NULL,
	"value" "enum_users_roles",
	"id" serial PRIMARY KEY NOT NULL
);

DROP INDEX IF EXISTS "email_idx";

ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_users_id_users_id_fk";

ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE varchar;
ALTER TABLE "payload_preferences_rels" ALTER COLUMN "users_id" SET DATA TYPE varchar;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users" ADD COLUMN "enable_a_p_i_key" boolean;
ALTER TABLE "users" ADD COLUMN "api_key" varchar;
ALTER TABLE "users" ADD COLUMN "api_key_index" varchar;
ALTER TABLE "groupchats_rels" ADD COLUMN "users_id" varchar;
CREATE INDEX IF NOT EXISTS "order_idx" ON "users_roles" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_roles" ("parent_id");
DO $$ BEGIN
 ALTER TABLE "groupchats_rels" ADD CONSTRAINT "groupchats_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "users" DROP COLUMN IF EXISTS "email";
ALTER TABLE "users" DROP COLUMN IF EXISTS "reset_password_token";
ALTER TABLE "users" DROP COLUMN IF EXISTS "reset_password_expiration";
ALTER TABLE "users" DROP COLUMN IF EXISTS "salt";
ALTER TABLE "users" DROP COLUMN IF EXISTS "hash";
ALTER TABLE "users" DROP COLUMN IF EXISTS "login_attempts";
ALTER TABLE "users" DROP COLUMN IF EXISTS "lock_until";
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}

export async function down({payload}: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

ALTER TABLE "groupchats_rels" DROP CONSTRAINT "groupchats_rels_users_id_users_id_fk";

DROP TABLE "users_roles";
ALTER TABLE "users" ALTER COLUMN "id" SET DATA TYPE serial;
ALTER TABLE "payload_preferences_rels" ALTER COLUMN "users_id" SET DATA TYPE integer;
ALTER TABLE "users" ADD COLUMN "email" varchar NOT NULL;
ALTER TABLE "users" ADD COLUMN "reset_password_token" varchar;
ALTER TABLE "users" ADD COLUMN "reset_password_expiration" timestamp(3) with time zone;
ALTER TABLE "users" ADD COLUMN "salt" varchar;
ALTER TABLE "users" ADD COLUMN "hash" varchar;
ALTER TABLE "users" ADD COLUMN "login_attempts" numeric;
ALTER TABLE "users" ADD COLUMN "lock_until" timestamp(3) with time zone;
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");
ALTER TABLE "users" DROP COLUMN IF EXISTS "enable_a_p_i_key";
ALTER TABLE "users" DROP COLUMN IF EXISTS "api_key";
ALTER TABLE "users" DROP COLUMN IF EXISTS "api_key_index";
ALTER TABLE "groupchats_rels" DROP COLUMN IF EXISTS "users_id";`);
}
