-- Create extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- CreateTable
CREATE TABLE "buddy_project_entry" (
    "user_id" TEXT NOT NULL,
    "buddy_id" TEXT,
    "matched_date" TIMESTAMPTZ(3),
    "reported_ghost_date" TIMESTAMPTZ(3),
    "blocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "buddy_project_entry_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buddy_project_entry_buddy_id_key" ON "buddy_project_entry"("buddy_id");

-- AddForeignKey
ALTER TABLE "buddy_project_entry" ADD CONSTRAINT "buddy_project_entry_buddy_id_fkey" FOREIGN KEY ("buddy_id") REFERENCES "buddy_project_entry"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
