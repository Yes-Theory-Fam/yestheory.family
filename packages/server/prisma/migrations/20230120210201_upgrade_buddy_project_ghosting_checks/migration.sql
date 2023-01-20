-- AlterTable
ALTER TABLE "buddy_project_entry" ADD COLUMN     "confirmed_not_ghosting_date" TIMESTAMPTZ(3),
ADD COLUMN     "ghost_report_count" INTEGER NOT NULL DEFAULT 0;
