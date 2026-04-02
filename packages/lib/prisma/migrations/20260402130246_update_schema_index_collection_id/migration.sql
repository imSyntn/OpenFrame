-- DropIndex
DROP INDEX "Collection_creator_id_idx";

-- CreateIndex
CREATE INDEX "Collection_creator_id_id_idx" ON "Collection"("creator_id", "id");
