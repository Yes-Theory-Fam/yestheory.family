import {
  type MigrateUpArgs,
  type MigrateDownArgs,
} from '@payloadcms/db-postgres';
import {sql} from 'drizzle-orm';

export async function up({payload}: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

    CREATE TABLE IF NOT EXISTS "groupchats_rels"
    (
        "id"
        serial
        PRIMARY
        KEY
        NOT
        NULL,
        "order"
        integer,
        "parent_id"
        integer
        NOT
        NULL,
        "path"
        varchar
        NOT
        NULL,
        "groupchat_keywords_id"
        integer
    );

    CREATE TABLE IF NOT EXISTS "groupchat_keywords"
    (
        "id"
        serial
        PRIMARY
        KEY
        NOT
        NULL,
        "value"
        varchar,
        "updated_at"
        timestamp
    (
        3
    ) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp
    (
        3
    )
      with time zone DEFAULT now() NOT NULL
        );

    DROP TABLE "groupchats_keywords";
    CREATE INDEX IF NOT EXISTS "order_idx" ON "groupchats_rels" ("order");
    CREATE INDEX IF NOT EXISTS "parent_idx" ON "groupchats_rels" ("parent_id");
    CREATE INDEX IF NOT EXISTS "path_idx" ON "groupchats_rels" ("path");
    CREATE INDEX IF NOT EXISTS "created_at_idx" ON "groupchat_keywords" ("created_at");
    DO
    $$
    BEGIN
    ALTER TABLE "groupchats_rels"
        ADD CONSTRAINT "groupchats_rels_parent_id_groupchats_id_fk" FOREIGN KEY ("parent_id") REFERENCES "groupchats" ("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
 WHEN duplicate_object THEN null;
    END $$;

DO
    $$
    BEGIN
    ALTER TABLE "groupchats_rels"
        ADD CONSTRAINT "groupchats_rels_groupchat_keywords_id_groupchat_keywords_id_fk" FOREIGN KEY ("groupchat_keywords_id") REFERENCES "groupchat_keywords" ("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
 WHEN duplicate_object THEN null;
    END $$;
`);
}

export async function down({payload}: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "groupchats_keywords" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL
);

DROP TABLE "groupchats_rels";
DROP TABLE "groupchat_keywords";
CREATE INDEX IF NOT EXISTS "_order_idx" ON "groupchats_keywords" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "groupchats_keywords" ("_parent_id");
DO $$ BEGIN
 ALTER TABLE "groupchats_keywords" ADD CONSTRAINT "groupchats_keywords__parent_id_groupchats_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "groupchats"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);
}
